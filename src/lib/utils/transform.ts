/** Transform JS data object into a FormData object */
export const getFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData()
  for (const key of Object.keys(data)) {
    formData.append(key, data[key])
  }
  return formData
}
