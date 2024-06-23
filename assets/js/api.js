/**
 * @license MIT
 * @author skies-codes <akashdebnathwd@gmail.com>
 * @copyright skies-codes 2024
 */

"use strict";

import config from "../../config.js";

const clientId = config.clientId;
const clientSecret = config.clientSecret;

let credentials;
if (clientId && clientSecret) {
    credentials = btoa(`${clientId}:${clientSecret}`);
} else {
    credentials = null;
}

/**
 *
 * @param {*} url API URL [required]
 * @param {*} successCallback Success callback [required]
 * @param {*} errorCallback Error callback [optional]
 */

export async function fetchData(url, successCallback, errorCallback) {
    let response;

    if (credentials) {
        response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Basic ${credentials}`,
            },
        });
    } else {
        response = await fetch(url);
    }
    if (response.ok) {
        const data = await response.json();
        successCallback(data);
    } else {
        const error = await response.json();
        errorCallback && errorCallback(error);
    }
}
