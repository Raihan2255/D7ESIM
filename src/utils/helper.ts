import dayjs from "dayjs";
import auth from "@/utils/auth";
import { APP_BASE_URL_KEY, mediaTenancy } from "@/utils/constants";

export const rowPerPages = [10, 15, 20, 25, 30, 50, 100, 200];
export const DATE_FORMAT_DEFAULT = "DD/MM/YYYY";
export const DATE_TIME_FORMAT_DEFAULT = "DD/MM/YYYY hh:mm a";
export const DATE_FORMAT_MONTH = "MM-DD-YYYY";
export const DATE_FORMAT_API = "YYYY-MM-DD";
export const TIME_FORMAT_DEFAULT = "hh:mm a";
export const TIME_FORMAT_SECONDS = "HH:mm:ss";
export const MONTH_DAYS_FORMAT = "MMMM DD, YYYY";
export const DATE_TIME_FORMAT_24H: string = "DD/MM/YYYY HH:mm";

export function prefixPluginTranslations(data: any, pluginId: string) {
  //  return Object.keys(data).reduce((r, o) => (r[`${pluginId}.${o}`] = data[o], r), {})

  return Object.keys(data).reduce((acc: any, current) => {
    acc[`${pluginId}.${current}`] = data[current];
    return acc;
  }, {});
}

export const reformatDate = (data: string, includeTime?: boolean) => {
  return dayjs(data).format(
    includeTime ? DATE_TIME_FORMAT_DEFAULT : DATE_FORMAT_DEFAULT
  );
};

export const reformatTime = (data: string) => {
  // To do the locale
  return dayjs(data).format(TIME_FORMAT_DEFAULT);
};

export const arrayToObject = (arr: any) => {
  return arr.reduce((obj: any, item: any) => {
    const key = Object.keys(item)[0];
    const value = item[key];

    if (key === "different") {
      obj[value] = obj[value] ? [obj[value], key] : key;
    } else {
      obj[key] = value;
    }

    return obj;
  }, {});
};

export const stringToJson = (
  inputString: string
): Record<string, string | number>[] => {
  try {
    const jsonArray = JSON?.parse(inputString);
    const jsonObjectArray: Record<string, string | number>[] = jsonArray.map(
      (item: string) => {
        const [key, value] = item.split(":");
        return { [key]: isNaN(Number(value)) ? value : Number(value) };
      }
    );
    return arrayToObject(jsonObjectArray);
  } catch (error) {
    console.error("Error parsing string to JSON:", error);
    return [];
  }
};

export const currentCurrency = () => {
  // To take the currency information from user info
  return "$";
};

export const removeEmptySearchParams = (params: any) => {
  const cleanedParams: any = {};

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key];

      if (value !== null && value !== undefined && value !== "") {
        cleanedParams[key] = value;
      }
    }
  }

  return cleanedParams;
};

export const getAppBaseUrl = () => {
  return auth.get(APP_BASE_URL_KEY) || import.meta.env.VITE_APP_API_BASE_URL;
};

export const getMediaBaseURL = () => {
  return getAppBaseUrl() + mediaTenancy;
};

export const getAppBaseUrlTxt = () => {
  const url = getAppBaseUrl();
  return url.replaceAll("/", "").replace("https:", "").replace("http:", "");
};

export const buildMediaUrl = ({
  url,
  height,
  width,
}: {
  url: string;
  height: string;
  width: string;
}) => {
  const baseUrl = getMediaBaseURL();
  return `${baseUrl + url}?h=${height}&w=${width}`;
};

export const buildUrlById = ({
  url,
  id,
}: {
  url: string;
  id: string | number;
}) => {
  return `${url.replace(/\/$/, "")}/${id}`;
};

export const generateNumberArray = (items: number) => {
  // Create an array with length equal to the number of items
  return Array.from({ length: items }, (_, index) => index + 1);
};

export const formatFieldName = (fieldName: string): string => {
  // Replace underscores with spaces
  let formattedName = fieldName.replace(/_/g, " ");

  // Capitalize the first letter of each word
  formattedName = formattedName.replace(/\b\w/g, (char: string) =>
    char.toUpperCase()
  );

  return formattedName;
};
export const formatLabel = (label: string): string => {
  return label
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
