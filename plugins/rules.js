import { defineRule } from "vee-validate";
import { getUnixTime, addDays, format } from "date-fns";
export default defineNuxtPlugin((vueApp) => {
  defineRule("onerequired", (value, [], ctx) => {
    return !!value || value?.length || "At least one selection required";
  }),
    defineRule("required", (value, [], ctx) => {
      return !!value || `Field Required`;
    }),
    defineRule("ChildExpense", (value, [options], context) => {
      if (value === 0) {
        return true; // Ignore 0
      }

      const isEmpty = value === null || value === undefined || value === "";
      return !isEmpty || `${options?.name || "Field"} is required`;
    });
  defineRule("requiredN", (value, [], ctx) => {
    return !!value || value?.length || `${ctx.name} Required`;
  }),
    defineRule("boolReq", (value, [], ctx) => {
      return typeof value == "boolean" || "Field Required";
    }),
    defineRule("fayda", (value, [], ctx) => {
      return !value || value.length == 10 || "Fayda ID must be 10 Digits";
    }),
    defineRule("verify_fayda", (value, [], ctx) => {
      return value || "Verify your Id";
    }),
    defineRule("array_object_required", (value, [], ctx) => {
      return value?.length || "Field Required";
    }),
    defineRule("yes_or_no", (value, [], ctx) => {
      return value?.length || "Field Required";
    }),
    defineRule("dyarrayrequired", (value, [], ctx) => {
      return (
        ctx.rule.params[0]?.includes("No_savings") ||
        value?.length ||
        "Field Required"
      );
    }),
    defineRule("email_phone", (value) => {
      return (
        !value ||
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
        /^(2519|2517)\d{8}$/.test(value) ||
        "invalid email or phone number"
      );
    }),
    defineRule("maxCharacterLength", (value, [limit], context) => {
      if (!value) {
        return true;
      }

      if (value.length > limit) {
        return `${context.field} must be less than or equal to ${limit}!`;
      }
      return true;
    }),
    defineRule("minCharacterLength", (value, [limit], context) => {
      if (!value) {
        return true;
      }

      if (value.length < limit) {
        return `${context.field} must be greater than or equal to ${limit}!`;
      }
      return true;
    }),
    defineRule("confirmedPassword", (value, [target], ctx) => {
      if (value === ctx.form.password) {
        return true;
      }
      return "passwords must match";
    }),
    defineRule("notInDatesArray", (value, { excludedDates }) => {
      // console.log('excludedDates', excludedDates);
      // console.log('value', value);
      if (!value) {
        return "Date Required";
      }
      if (!Array.isArray(excludedDates) || excludedDates.length === 0) {
        return true; // No exclusion dates provided, rule passes
      }

      const inputDate = new Date(value);

      for (const excludedDate of excludedDates) {
        const dateToCompare = new Date(excludedDate);

        // Check if the input date is equal to any excluded date
        if (isEqual(inputDate, dateToCompare)) {
          return "submitted date on this date is already taken";
        }
      }

      return true;
    });
  defineRule("validCoordinates", (value) => {
    const regex = /^[-+]?\d*\.?\d+,\s*[-+]?\d*\.?\d+$/;

    if (!value.match(regex)) {
      return "Invalid coordinates format";
    }

    return true;
  });
  defineRule("dateRange", (value, [min, max], ctx) => {
    // The field is empty so it should pass
    if (!value || !value.length) {
      return true;
    }
    const numericValue = Number(
      new Date().getFullYear() - new Date(value).getFullYear()
    );

    if (numericValue > max) {
      return `Age Date must be less than ${max}`;
    }
    return true;
  }),
    defineRule("arrayRequired", (value, [], ctx) => {
      return value?.length || "Field Required";
    }),
    defineRule("arrayDynamicRequired", (value, [], ctx) => {
      return ctx.rule.params[0] !== true || value?.length || "Field Required";
    }),
    defineRule("arrayDynamicRequiredBusiness", (value, [], ctx) => {
      return (
        ctx.rule.params[0] != "has_business_idea_and_own_business" ||
        value?.length ||
        "Field Required"
      );
    }),
    defineRule("dyrequired", (value, [], ctx) => {
      return (
        (typeof ctx.rule.params[0] == "boolean" &&
          ctx.rule.params[0] == false) ||
        !!value ||
        value?.length ||
        "Field Required"
      );
    }),
    defineRule("requireBusiness", (value, [], ctx) => {
      return (
        !!value ||
        ctx.rule.params[0] != "has_business_idea_and_own_business" ||
        value?.length ||
        "Field Required"
      );
    }),
    defineRule("arrya_object_dyrequired", (value, [], ctx) => {
      return (
        ctx.rule.params[0] == "no" ||
        ctx.rule.params[0] == "No" ||
        ctx.rule.params[0] == undefined ||
        value?.length ||
        "Field Required"
      );
    }),
    defineRule("dyrequirednot", (value, [], ctx) => {
      return (
        ctx.rule.params[0] == "yes" ||
        ctx.rule.params[0] == "Yes" ||
        ctx.rule.params[0] == undefined ||
        ctx.rule.params[0] == "sole_proprietorship" ||
        !!value ||
        value?.length ||
        "Field Required"
      );
    }),
    defineRule("number", (value) => {
      return !value || /^[0-9]+$/.test(value) || "Number only";
    }),
    defineRule("numberFromZero", (value, [], ctx) => {
      return (
        !value ||
        /^(?:0|[1-9]\d*)$/.test(value) ||
        "Number greater than zero only"
      );
    }),
    defineRule("numrange", (value) => {
      return !value || /^[0-9-]+$/.test(value) || "Number only";
    }),
    defineRule("email", (value) => {
      return (
        !value ||
        /[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
          value
        ) ||
        "Not Valid Email"
      );
    }),
    defineRule("International_phone_number", (value) => {
      return (
        !value ||
        /^\+(?:[0-9] ?){6,14}[0-9]$/.test(value) ||
        "Not valid phone number"
      );
    }),
    defineRule("minLength", (value, [], context) => {
      if (value.length >= context.rule.params[0]) {
        return true;
      } else {
        return `${context.field} is must be greater than ${context.rule.params[0]}`;
      }
    }),
    defineRule("minAge", (value, [limit]) => {
      if (!value) {
        return true;
      }

      if (
        differenceInCalendarYears(new Date(), new Date(value)) < parseInt(limit)
      ) {
        return `Age must be greater than or equal to ${limit}!`;
      }
      return true;
    });
  defineRule("maxAge", (value) => {
    if (!value) {
      return true;
    }

    if (getUnixTime(new Date(value)) >= getUnixTime(new Date())) {
      return `Age must be less than or equal to today!`;
    }
    return true;
  });
  defineRule("maxAgeThreeYears", (value) => {
    if (!value) {
      return true;
    }
    if (getUnixTime(new Date(value)) >= getUnixTime(new Date())) {
      return `Age must be less than or equal to 3 years!`;
    }
    const threeYearsAgo = new Date();
    threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

    if (getUnixTime(new Date(value)) < getUnixTime(threeYearsAgo)) {
      return "Age must be less than or equal to 3 years!";
    }

    return true;
  });
  defineRule("minDate", (value, [minDate]) => {
    if (!value) {
      return true;
    }

    const minDateObject = new Date(minDate);
    minDateObject.setDate(minDateObject.getDate() + 1);

    if (getUnixTime(new Date(value)) < getUnixTime(minDateObject)) {
      return `Date must be after ${format(minDateObject, "yyyy-MM-dd")}!`;
    }

    return true;
  });
  defineRule("betweenSixMonthsAndThreeYears", (value) => {
    if (!value) {
      return true;
    }

    const currentDate = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const threeYearsAgo = new Date();
    threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

    const dateValue = new Date(value);

    if (
      getUnixTime(dateValue) >= getUnixTime(sixMonthsAgo) ||
      getUnixTime(dateValue) < getUnixTime(threeYearsAgo)
    ) {
      return "Age must be between 6 months and 3 years!";
    }

    return true;
  });

  defineRule("maxLength", (value, [], context) => {
    if (value.length <= context.rule.params[0]) {
      return true;
    } else {
      return `${context.field} must be ${context.rule.params[0]} digits.`;
    }
  }),
    defineRule("length", (value, [target], context) => {
      if (value?.length == context?.rule?.params[0]) {
        return true;
      } else {
        return `${context?.field} must be ${context?.rule?.params[0]} digits long.`;
      }
    }),
    defineRule("Tinlength", (value, [target], context) => {
      if (target == "has_business_idea") return true;
      if (value?.length == 10) {
        return true;
      } else {
        return `${context?.field} must be 10 digits long.`;
      }
    });

  defineRule("ethiopian_phone_number", (value) => {
    return !value || /^(7|9)\d{8}$/.test(value) || "Not valid phone number";
  }),
    defineRule("ethio_phone", (value) => {
      return !value || /^(7|9)\d{8}$/.test(value) || "Not valid phone number";
    }),
    defineRule("password", (value) => {
      // return !value || value.length >= 8 || i18n.global.t("password_too_short");
      return (
        !value ||
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])[\w\d\S]{6,}$/.test(
          value
        ) ||
        "password must have at least one uppercase, lowercase, special character, and at least 6 characters"
      );
    });
  defineRule("confirmed", (value, [other]) => {
    return !value || value === other || "Password is not the same";
  }),
    defineRule("dyrequiredemail", (value, [other], ctx) => {
      return (
        ctx.rule.params[0] != "email" ||
        !!value ||
        value?.length ||
        "Field Required"
      );
    }),
    defineRule("dyrequiredlink", (value, [other], ctx) => {
      return (
        ctx.rule.params[0] != "link" ||
        !!value ||
        value?.length ||
        "Field Required"
      );
    }),
    defineRule("validPassword", (value) => {
      const strongRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      );
      return (
        !value ||
        strongRegex.test(value) ||
        "The password should contain letters, numbers, uppercase and special symbols."
      );
    }),
    defineRule("amChar", (value) => {
      return (
        !value ||
        /[\u1200-\u137F]/.test(value.replace(/\s/g)) ||
        "This filed only accepts Amharic characters"
      );
    }),
    defineRule("enChar", (value) => {
      return (
        !value ||
        !/[\u1200-\u137F]/.test(value.replace(/\s/g)) ||
        "This filed only accepts English characters"
      );
    }),
    defineRule("checkMinimumInMax", (value, [other]) => {
      if (other) {
        return (
          !value ||
          parseInt(value) >= parseInt(other) ||
          i18n.global.t("max_and_min_check")
        );
      }
      return true;
    });
  /*------------------------------  Dynamic rules-------------------------------*/
  // max_date
  defineRule("max_date", (value, [maxDate], ctx) => {
    const valueDate = new Date(value);
    const dateValue = new Date(maxDate);
    return valueDate <= dateValue
      ? true
      : `${ctx.field} Must be ${maxDate} or less`;
  }),
    // min_date

    defineRule("min_date", (value, [minDate], ctx) => {
      const valueDate = new Date(value);
      const minDateValue = new Date(minDate);

      return valueDate >= minDateValue
        ? true
        : `${ctx.field} must be ${minDate} or more`;
    });

  defineRule("is_phone_number", (value) => {
    return (
      !value || /^(2517|2519)\d{8}$/.test(value) || "Not valid phone number"
    );
  }),
    defineRule("is_email", (value, [], ctx) => {
      return (
        !value ||
        /[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
          value
        ) ||
        "Not Valid Email"
      );
    });
  defineRule("is_required", (value, [], ctx) => {
    return !!value || value?.length || "Field Required";
  }),
    defineRule("max_word", (value, [max], ctx) => {
      return value?.length <= max
        ? true
        : `${ctx.field} Must be ${max} words or less`;
    }),
    defineRule("min_word", (value, [min], ctx) => {
      return value?.length >= min
        ? true
        : `${ctx.field} Must be ${min} words or more`;
    }),
    defineRule("max", (value, [max], ctx) => {
      return value <= max ? true : `must be ${max}   or less`;
    }),
    defineRule("min", (value, [min], ctx) => {
      return value >= min ? true : `must be ${min}  or more`;
    }),
    defineRule("max_length", (value, [max], ctx) => {
      return value?.length <= max
        ? true
        : `${ctx.field} Must be ${max} characters or less`;
    });

  defineRule("min_length", (value, [min], ctx) => {
    return value?.length >= min
      ? true
      : `${ctx.field} Must be ${min} characters or more`;
  });
  defineRule("unique", (value, [arr], ctx) => {
    return arr?.length && arr.includes(value) ? `Already exists` : true;
  });
  defineRule("is_url", (value, [], ctx) => {
    return (
      !value ||
      /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/.test(
        value
      ) ||
      "Not Valid Web Url"
    );
  });
  defineRule("file_types", (value, [allowedTypes]) => {
    return true;
  });

  defineRule("max_file_size", (value, [allowedTypes]) => {
    return true;
  });

  defineRule("max_file_count", (value, [allowedTypes]) => {
    return true;
  });
});
