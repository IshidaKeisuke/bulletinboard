### サービスを受ける方用
curl -v -X POST https://api.line.me/v2/bot/richmenu \
-H 'Authorization: Bearer /pOEsiLquu6EZxePHUwEEYahFzea8p2W8M5fzzfnI1q0e9riqqj07ecHMLbEdCiQZwDPTkeQWvUorFrSRpI7r38gLSfAtVNajqfkfNUYaMxJaQeTO6P4MM72GfmxWZLtPGTNp5PKk71/UZhgavkWWAdB04t89/1O/w1cDnyilFU=' \
-H 'Content-Type: application/json' \
-d \
'{
    "size": {
        "width": 2500,
        "height": 1686
    },
    "selected": true,
    "name": "richmenu-a",
    "chatBarText": "お母さんはこちら",
    "areas": [
        {
            "bounds": {
                "x": 1250,
                "y": 0,
                "width": 1250,
                "height": 300
            },
            "action": {
                "type": "richmenuswitch",
                "label": "先輩ママ・パパはこちら",
                "richMenuAliasId": "to-ogmother-obfather",
                "data": "ogmother-obfather"
            }
        },
        {
            "bounds": {
                "x": 0,
                "y": 300,
                "width": 833,
                "height": 693
            },
            "action": {
                "type": "uri",
                "uri": "https://developers.line.biz/"
            }
        },
        {
            "bounds": {
                "x": 833,
                "y": 300,
                "width": 833,
                "height": 693
            },
            "action": {
                "type": "uri",
                "uri": "https://google.com"
            }
        },
        {
            "bounds": {
                "x": 1666,
                "y": 180,
                "width": 833,
                "height": 693
            },
            "action": {
                "type": "uri",
                "uri": "https://about.instagram.com/"
            }
        },


        {
            "bounds": {
                "x": 0,
                "y": 933,
                "width": 833,
                "height": 693
            },
            "action": {
                "type": "uri",
                "uri": "https://about.meta.com/"
            }
        },        
        {
            "bounds": {
                "x": 833,
                "y": 933,
                "width": 833,
                "height": 693
            },
            "action": {
                "type": "uri",
                "uri": "https://www.netflix.com/jp-en/"
            }
        },        
        {
            "bounds": {
                "x": 1666,
                "y": 933,
                "width": 833,
                "height": 693
            },
            "action": {
                "type": "uri",
                "uri": "https://www.microsoft.com/ja-jp/"
            }
        }
    ]
}'


curl -v -X POST https://api-data.line.me/v2/bot/richmenu/richmenu-7fcb4a296c6c46b97fa9d0586ad8019d/content \
-H "Authorization: Bearer /pOEsiLquu6EZxePHUwEEYahFzea8p2W8M5fzzfnI1q0e9riqqj07ecHMLbEdCiQZwDPTkeQWvUorFrSRpI7r38gLSfAtVNajqfkfNUYaMxJaQeTO6P4MM72GfmxWZLtPGTNp5PKk71/UZhgavkWWAdB04t89/1O/w1cDnyilFU=" \
-H "Content-Type: image/png" \
-T /Users/ishidakeisuke/Downloads/LINEリッチメニュー/サービス受給者.png


### サービスを提供する方用
curl -v -X POST https://api.line.me/v2/bot/richmenu \
-H 'Authorization: Bearer /pOEsiLquu6EZxePHUwEEYahFzea8p2W8M5fzzfnI1q0e9riqqj07ecHMLbEdCiQZwDPTkeQWvUorFrSRpI7r38gLSfAtVNajqfkfNUYaMxJaQeTO6P4MM72GfmxWZLtPGTNp5PKk71/UZhgavkWWAdB04t89/1O/w1cDnyilFU=' \
-H 'Content-Type: application/json' \
-d \
'{
    "size": {
        "width": 2500,
        "height": 1686
    },
    "selected": true,
    "name": "richmenu-a",
    "chatBarText": "お母さんはこちら",
    "areas": [
        {
            "bounds": {
                "x": 0,
                "y": 0,
                "width": 1250,
                "height": 300
            },
            "action": {
                "type": "richmenuswitch",
                "label": "ママはこちら",
                "richMenuAliasId": "to-mom",
                "data": "to-mom"
            }
        },
        {
            "bounds": {
                "x": 0,
                "y": 300,
                "width": 833,
                "height": 693
            },
            "action": {
                "type": "uri",
                "uri": "https://developers.line.biz/"
            }
        },
        {
            "bounds": {
                "x": 833,
                "y": 300,
                "width": 833,
                "height": 693
            },
            "action": {
                "type": "uri",
                "uri": "https://google.com"
            }
        },
        {
            "bounds": {
                "x": 1666,
                "y": 180,
                "width": 833,
                "height": 693
            },
            "action": {
                "type": "uri",
                "uri": "https://about.instagram.com/"
            }
        },


        {
            "bounds": {
                "x": 0,
                "y": 933,
                "width": 833,
                "height": 693
            },
            "action": {
                "type": "uri",
                "uri": "https://about.meta.com/"
            }
        },        
        {
            "bounds": {
                "x": 833,
                "y": 933,
                "width": 833,
                "height": 693
            },
            "action": {
                "type": "uri",
                "uri": "https://www.netflix.com/jp-en/"
            }
        },        
        {
            "bounds": {
                "x": 1666,
                "y": 933,
                "width": 833,
                "height": 693
            },
            "action": {
                "type": "uri",
                "uri": "https://www.microsoft.com/ja-jp/"
            }
        }
    ]
}'



curl -v -X POST https://api-data.line.me/v2/bot/richmenu/richmenu-f14a90cf044b69f30abe948c513ea8ce/content \
-H 'Authorization: Bearer /pOEsiLquu6EZxePHUwEEYahFzea8p2W8M5fzzfnI1q0e9riqqj07ecHMLbEdCiQZwDPTkeQWvUorFrSRpI7r38gLSfAtVNajqfkfNUYaMxJaQeTO6P4MM72GfmxWZLtPGTNp5PKk71/UZhgavkWWAdB04t89/1O/w1cDnyilFU=' \
-H "Content-Type: image/png" \
-T /Users/ishidakeisuke/Downloads/LINEリッチメニュー/サービス提供者.png


### デフォルトをサービスを受ける方用にする
curl -v -X POST https://api.line.me/v2/bot/user/all/richmenu/richmenu-7fcb4a296c6c46b97fa9d0586ad8019d \
-H 'Authorization: Bearer /pOEsiLquu6EZxePHUwEEYahFzea8p2W8M5fzzfnI1q0e9riqqj07ecHMLbEdCiQZwDPTkeQWvUorFrSRpI7r38gLSfAtVNajqfkfNUYaMxJaQeTO6P4MM72GfmxWZLtPGTNp5PKk71/UZhgavkWWAdB04t89/1O/w1cDnyilFU='


### リッチメニューエイリアスA（サービスを受ける方用）を作成する
curl -v -X POST https://api.line.me/v2/bot/richmenu/alias \
-H 'Authorization: Bearer /pOEsiLquu6EZxePHUwEEYahFzea8p2W8M5fzzfnI1q0e9riqqj07ecHMLbEdCiQZwDPTkeQWvUorFrSRpI7r38gLSfAtVNajqfkfNUYaMxJaQeTO6P4MM72GfmxWZLtPGTNp5PKk71/UZhgavkWWAdB04t89/1O/w1cDnyilFU=' \
-H 'Content-Type: application/json' \
-d \
'{
    "richMenuAliasId": "to-mom",
    "richMenuId": "richmenu-7fcb4a296c6c46b97fa9d0586ad8019d"
}'


### リッチメニューエイリアスB（サービスを提供する方用）を作成する
curl -v -X POST https://api.line.me/v2/bot/richmenu/alias \
-H 'Authorization: Bearer /pOEsiLquu6EZxePHUwEEYahFzea8p2W8M5fzzfnI1q0e9riqqj07ecHMLbEdCiQZwDPTkeQWvUorFrSRpI7r38gLSfAtVNajqfkfNUYaMxJaQeTO6P4MM72GfmxWZLtPGTNp5PKk71/UZhgavkWWAdB04t89/1O/w1cDnyilFU=' \
-H 'Content-Type: application/json' \
-d \
'{
    "richMenuAliasId": "to-ogmother-obfather",
    "richMenuId": "richmenu-f14a90cf044b69f30abe948c513ea8ce"
}'
