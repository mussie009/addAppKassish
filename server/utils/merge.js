const merge = (first, second) => {
  let merged = [];

  for (i = 0; i < first.length; i++) {
    merged.push({
      ...first[i],
      ...second[i],
    });
  }

  return merged;
};

module.exports = {
    merge
};