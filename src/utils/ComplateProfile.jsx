function ComplateProfile(user) {
  if (
    user.nohp === "" ||
    user.province === "" ||
    user.citydistrict === "" ||
    user.subdistrict === "" ||
    user.address === "" ||
    user.location === ""
  ) {
    /* eslint-disable no-restricted-globals */
    const confirmation = confirm("Lengkapi Profile Dulu");
    /* eslint-enable no-restricted-globals */
    if (confirmation) {
      window.location.href = `/user/myproducts`;
    } else {
      window.location.href = `/user/profile/${user.uuid}`;
    }
  } else {
    console.log("user :", user.hp);
  }
}

export default ComplateProfile;
