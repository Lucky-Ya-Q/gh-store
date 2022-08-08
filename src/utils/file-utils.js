export function getFileSuffix (filename) {
  const splitIndex = filename.lastIndexOf('.')
  return filename.substr(splitIndex + 1, filename.length)
}

export function isImage (suffix) {
  return /(png|jpg|gif|jpeg|webp|avif|svg\+xml|image\/x-icon)$/.test(suffix)
}
