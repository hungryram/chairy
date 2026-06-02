const EXCLUDED_FIELD_NAMES = new Set([
  'bcc',
  'cc',
  'name-honey',
  'sendTo',
  'sendFrom',
  'subject',
  'redirectTo',
  'googleSheetId',
  'googleSheetName',
  'hutk',
  'ipAddress',
  'pageUri',
  'pageName',
]);

const CONTACT_PROPERTY_ALLOWLIST = new Set([
  'email',
  'firstname',
  'lastname',
  'phone',
  'company',
  'website',
  'address',
  'city',
  'state',
  'zip',
  'country',
  'jobtitle',
]);

const COMMON_FIELD_NAME_MAP: Record<string, string> = {
  email: 'email',
  'e-mail': 'email',
  'email address': 'email',
  firstname: 'firstname',
  'first name': 'firstname',
  lastname: 'lastname',
  'last name': 'lastname',
  phone: 'phone',
  company: 'company',
  'company name': 'company',
  website: 'website',
  address: 'address',
  city: 'city',
  state: 'state',
  zip: 'zip',
  'zip code': 'zip',
  postal: 'zip',
  'postal code': 'zip',
  country: 'country',
  title: 'jobtitle',
  'job title': 'jobtitle',
};

const normalizeHubSpotFieldName = (name: string): string => {
  const normalized = name.toString().trim().toLowerCase().replace(/[_-]+/g, ' ');
  return COMMON_FIELD_NAME_MAP[normalized] || name.toString().trim();
};

const isFileValue = (value: FormDataEntryValue): value is File => value instanceof File;

const buildContactProperties = (formData: FormData): Record<string, string> => {
  const properties: Record<string, string> = {};

  formData.forEach((value, rawName) => {
    const name = rawName.toString();

    if (name.includes('$ACTION_ID') || EXCLUDED_FIELD_NAMES.has(name) || isFileValue(value)) {
      return;
    }

    const normalizedName = normalizeHubSpotFieldName(name);
    const normalizedValue = value.toString().trim();

    if (!normalizedValue || !CONTACT_PROPERTY_ALLOWLIST.has(normalizedName)) {
      return;
    }

    properties[normalizedName] = normalizedValue;
  });

  return properties;
};

export const upsertContactViaCRM = async (formData: FormData): Promise<boolean> => {
  const tokenFromEnv = process.env.HUBSPOT_PRIVATE_APP_TOKEN || process.env.HUBSPOT_API_KEY || '';
  const privateAppToken = tokenFromEnv.toString().trim().replace(/^['\"]|['\"]$/g, '');

  if (!privateAppToken) {
    console.error('HubSpot token missing. Set HUBSPOT_PRIVATE_APP_TOKEN in the server environment.');
    return false;
  }

  const properties = buildContactProperties(formData);
  const email = (properties.email || formData.get('Email') || formData.get('email') || '').toString().trim();

  if (!email) {
    return false;
  }

  properties.email = email;

  try {
    const searchResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${privateAppToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              {
                propertyName: 'email',
                operator: 'EQ',
                value: email,
              },
            ],
          },
        ],
        properties: ['email'],
        limit: 1,
      }),
    });

    if (!searchResponse.ok) {
      const errorBody = await searchResponse.text();
      console.error('HubSpot contact search failed', searchResponse.status, errorBody);
      return false;
    }

    const searchResult = await searchResponse.json() as {
      results?: Array<{ id?: string }>;
    };

    const contactId = searchResult?.results?.[0]?.id;
    const method = contactId ? 'PATCH' : 'POST';
    const endpoint = contactId
      ? `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`
      : 'https://api.hubapi.com/crm/v3/objects/contacts';

    const response = await fetch(endpoint, {
      method,
      headers: {
        Authorization: `Bearer ${privateAppToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('HubSpot contact upsert failed', response.status, errorBody);
      return false;
    }

    return true;
  } catch (error) {
    console.error('HubSpot contact upsert error', error);
    return false;
  }
};

export async function submitLeadToHubSpot(formData: FormData): Promise<boolean> {
  return upsertContactViaCRM(formData);
}