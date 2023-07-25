import axiosInstance from "variables/axiosInstance";
import isTest from "variables/isTest";

const isWWW = () => isTest
    ? axiosInstance.defaults.baseURL?.includes("www.dropingaming.") ?? false
    : location.hostname.includes("www.dropingaming.");

export default isWWW