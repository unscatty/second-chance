export const ageDescription = (dogAge: number) => {
  if (dogAge < 1) {
    return 'Less than a year'
  }

  if (dogAge === 1) {
    return '1 year old'
  }

  return `${dogAge} years old`
}
