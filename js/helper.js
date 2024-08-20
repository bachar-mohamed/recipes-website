const timer = function (seconds) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("request took too long!"));
    }, seconds * 1000);
  });
};

const jsonCall = async function (url) {
  try {
    const request = await Promise.race([fetch(url), timer(5)]);
    const data = await request.json();
    if (!request.ok) throw new Error(`${data.message}:${data.status}`);
    return data.data.recipes ?? data.data.recipe;
  } catch (error) {
    throw error;
  }
};

export { jsonCall };
