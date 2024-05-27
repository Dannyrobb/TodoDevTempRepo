export const getUserData = async (access_token: string) => {
  try {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`);
    const data = await response.json();
    console.log("from getUserData");
    console.log(data);
  } catch (e) {
    console.log("error from getUserData :", e);
  }
};
