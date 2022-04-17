export const noSplCharRegex = /^[a-zA-Z0-9 ]+$/;

export const noNoRegex = /^[a-zA-Z]+$/;

export const noSplCharRegexAndNo = /^[a-zA-Z]*$/;

export const noSplCharAndLetterRegex = /^[0-9]{2,4}$/;

export const phoneNumberRegex =
    /^(?:0|0094|\+94)?(?:(7)(0|1|2|3|4|5|6|7|8|9)\d)\d{6}$/;

export const noSplCharAndNoRegex = /^[a-zA-Z\s]*$/;

export const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const empIdRegex = /^((emp|EMP)[0-9]{3})$/;

export const nicRegex = /^\d{9}[V|v|x|X]$/;
