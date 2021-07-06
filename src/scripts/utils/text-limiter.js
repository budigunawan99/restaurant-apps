const TextLimiter = (description, charcount) => {
  if (description.length > charcount) {
    return `${description.substring(0, charcount)}...`;
  }
  return description;
};

export default TextLimiter;
