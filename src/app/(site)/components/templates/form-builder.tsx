import React from 'react';
import { submitForm } from './_formActions'
import Styles from "./form-builder.module.css"
import ContentEditor from '../util/content-editor';

interface FormField {
  name: string;
  label: string;
  type: any;
  _key: string;
  radioValue: string[];
  selectValue: string[];
  checkBoxValue: string[];
  required: boolean;
  stacked: boolean;
  inlineEmail: boolean;
  hideLabel: boolean;
  half: boolean
}

interface FormSchema {
  subject: string;
  fields: FormField[];
  emailCc: string;
  emailBcc: string;
  sendTo: string;
  sendFrom: string;
  redirectTo: string;
  buttonLabel: string;
  buttonBackgroundColor: any;
  buttonTextColor: any;
  formDisclaimer: any
  makeStacked: boolean;
}

interface FormBuilderProps {
  formSchema: FormSchema;
}

export default function FormBuilder({ formSchema }: FormBuilderProps) {
  return (
    <div className="py-2">
      <form action={submitForm}>
        <label className="hidden" htmlFor="name-honey" />
        <input className="hidden" type="text" name="name-honey" />
        <input className="hidden" type="hidden" name="bcc" value={formSchema?.emailBcc} />
        <input className="hidden" type="hidden" name="cc" value={formSchema?.emailCc} />
        <input className="hidden" type="hidden" name="sendFrom" value={formSchema?.sendFrom ? formSchema.sendFrom : 'forms@hungryramwebdesign.com'} />
        <input className="hidden" type="hidden" name="sendTo" value={formSchema?.sendTo} />
        <input className="hidden" type="hidden" name="subject" value={formSchema?.subject} />
        <input className="hidden" type="hidden" name="redirectTo" value={formSchema?.redirectTo} />
        {formSchema?.fields && (
          <div className="grid grid-cols-4 gap-x-2">
            {formSchema.fields.map((field, i) => {
              return (
                <div className={field.half ? 'col-span-2' : 'col-span-4'} key={field._key}>
                  {field?.hideLabel ?
                    <></>
                    :
                    <label htmlFor={field.label.replace(/ /g, '') + i} className={Styles.formLabel}>
                      {field.label}
                      {field.required && <span>*</span>}
                    </label>
                  }
                  {field.type === 'text' && (
                    <input
                      type="text"
                      name={field.label}
                      className={Styles.formDefaultInput}
                      id={field.label.replace(/ /g, '') + i}
                      required={field.required ? true : undefined}
                    />
                  )}
                  {field.type === 'file' && (
                    <input
                      type="file"
                      name={field.label}
                      className={Styles.formDefaultInput}
                      id={field.label.replace(/ /g, '') + i}
                      required={field.required ? true : undefined}
                    />
                  )}
                  {field.type === 'email' && (
                    <input
                      type="email"
                      name={field.label}
                      className={`${Styles.formDefaultInput} ${field?.inlineEmail ? 'flex-auto' : ''}`}
                      placeholder={field?.hideLabel ? field?.label : ''}
                      id={field.label.replace(/ /g, '') + i}
                      required={field.required ? true : undefined}
                    />
                  )}
                  {field.type === 'phone' && (
                    <input
                      type="tel"
                      name={field.label}
                      className={Styles.formDefaultInput}
                      id={field.label.replace(/ /g, '') + i}
                      required={field.required ? true : undefined}
                    />
                  )}
                  {field.type === 'radio' && (
                    <div className={`gap-x-6 mt-4 ${field?.stacked ? '' : 'flex items-center'}`}>
                      {field?.radioValue?.map((node, i) => {
                        return (
                          <div className="flex items-center gap-2 my-1" key={i}>
                            <input
                              type="radio"
                              name={field.label}
                              id={node.replace(/^[^A-Za-z0-9]+/g, '').replace(/[^A-Za-z0-9_\-:.]/g, '') + i}
                              className="h-4 w-4 rounded border-gray-300"
                              required={field.required ? true : undefined}
                            />
                            <label htmlFor={node.replace(/^[^A-Za-z0-9]+/g, '').replace(/[^A-Za-z0-9_\-:.]/g, '') + i} className={Styles.formInputList}>
                              {node}
                            </label>
                          </div>
                        )
                      })}
                    </div>
                  )}
                  {field.type === 'checkbox' && (
                    <div className={`gap-x-6 mt-4 ${field?.stacked ? '' : 'flex items-center'}`}>
                      {field?.checkBoxValue?.map((node, i) => {
                        return (
                          <div className="flex items-center gap-2 my-1" key={i}>
                            <input
                              type="checkbox"
                              name={field.label}
                              id={node.replace(/^[^A-Za-z0-9]+/g, '').replace(/[^A-Za-z0-9_\-:.]/g, '') + i}
                              className="h-4 w-4 rounded border-gray-300"
                              value={node}
                              required={field.required ? true : undefined}
                            />
                            <label htmlFor={node.replace(/^[^A-Za-z0-9]+/g, '').replace(/[^A-Za-z0-9_\-:.]/g, '') + i} className={Styles.formInputList}>
                              {node}
                            </label>
                          </div>
                        )
                      })}
                    </div>
                  )}
                  {field.type === 'select' && (
                    <div className="flex items-center gap-x-3 mt-4">
                      <select
                        id={field.label.replace(/ /g, '') + i}
                        name={field.label}
                        className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm sm:max-w-xs sm:text-sm sm:leading-6 bg-gray-100"
                        required={field.required ? true : undefined}
                      >
                        {field?.selectValue?.map((node, i) => {
                          return (
                            <option value={node} key={i}>
                              {node}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  )}
                  {field.type === 'textarea' && (
                    <textarea
                      name={field.label}
                      className={Styles.formDefaultInput}
                      rows={3}
                      id={field.label.replace(/ /g, '') + i}
                      required={field.required ? true : undefined}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
        {formSchema?.formDisclaimer &&
          <div className="mb-6 text-xs mt-4">
            <ContentEditor
              content={formSchema?.formDisclaimer}
            />
          </div>
        }
        <div className="flex justify-end">
          <button type="submit" className="primary-button ml-2 mb-2" style={{
            backgroundColor: formSchema?.buttonBackgroundColor?.hex,
            color: formSchema?.buttonTextColor?.hex
          }}>
            {formSchema?.buttonLabel ?? 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}