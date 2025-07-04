#!/usr/bin/env python3

import json
import requests
from requests.exceptions import HTTPError
from utils import (
    get_env_info,
    get_futures_api_version,
    get_futures_full_url,
    gen_headers,
)


def futures_cancel_order(data):
    url = "/api/{0}/order".format(get_futures_api_version())
    env = get_env_info()
    headers = gen_headers(env["API_KEY"], env["API_SECRET_KEY"], url)
    ret = {}
    try:
        resp = requests.delete(
            get_futures_full_url(env["API_HOST"], url),
            params=data,
            headers=headers,
        )
        resp.raise_for_status()
    except HTTPError as http_err:
        print("HTTP error occurred: {0}".format(http_err))
    except Exception as err:
        print("Other error occurred: {0}".format(err))
    finally:
        ret = resp.json()
    return ret


if __name__ == "__main__":
    # your orderId
    symbol = "BTC-PERP"
    clOrderID = "_kqle1661414436953"
    orderID = "3af65527-fb0e-4a01-a8a3-855339948e9f"
    print(
        futures_cancel_order(
            {"symbol": symbol, "clOrderID": clOrderID, "orderID": orderID}
        )
    )
