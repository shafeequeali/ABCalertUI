export class Utility {
  constructor() {}

  emailValidation(email: any): boolean {
    let errFound = true;
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // console.log({ tag: this.TAG + ' emailvarification', retunofmatach: email.match(validRegex), test: text.match(validRegex) });
    // let emailerr = "please enter valid email address";
    if (email.match(validRegex) != null) {
      // console.log({ tag: this.TAG + ' emailVarification-succseee' });
      // emailerr = ""
      errFound = false;
    }
    return errFound;
  }

  phoneNumberValidation(text: any): boolean {
    const splited = text.split(',');
    const lengthOfSpited = splited.length;
    let errorFound: boolean = false;
    // let test = []
    for (let i = 0; i < lengthOfSpited; i++) {
      let str = splited[i];
      if (isNaN(str)) {
        errorFound = true;
        i = lengthOfSpited + 1;
        // test.push('n')
      } else {
        if (str.charAt(0) === '+' || str.charAt(0) >= 0) {
          if (str.length < 15 && str.length > 5) {
            // test.push('Yes')
          } else {
            errorFound = true;
            i = lengthOfSpited + 1;
            // test.push('no')
          }
        } else {
          errorFound = true;
          i = lengthOfSpited + 1;
          // test.push('no')
        }
      }
    }
    // console.log({ tag: this.TAG + ' phoneNumberValidation', slicedtype: typeof splited, splited, test, errorFound });

    return errorFound;
  }
}

export const systemConfig = {
  hostAddress: 'https://dry-caverns-04220.herokuapp.com/',
  // hostAddress: 'http://localhost:3000/',
};
