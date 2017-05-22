window.__coreObject = {
    "core": {
        "config": {
            "dev": {
                "ws": "ws://localhost:8001"
            }
        },
        "router": {
            "animation": {
                "name": "koko",
                "duration": 600
            },
            "home": "/dashboard/compare",

            "map": [{
              "name": "dashboard",
              "component": "dashboard",
              "children": [{
                "name": "myzone",
                "component": "myzone",
                "children": []
              },{
                "name": "compare",
                "component": "compare",
                "children": []
              },{
                "name": "news",
                "component": "news",
                "children": []
              }]
            }],
            "encodeURI": false
        },
        "templates": [],
        "views": [],
        "collections": [],

        "language": {
            "key": "en"
        },
        "theme": {
            "font": "Noto Sans",
            "palletes": [
                {
                    "name": "primary",
                    "pallete": {
                        "normal": "#a5d6a7",
                        "hover": "#37474f",
                        "active": "#607d8b",
                        "disabled": "#c3c7ca"
                    }
                },
                {
                    "name": "secondary",
                    "pallete": {
                        "normal": "#0099cc",
                        "hover": "#03a9f4",
                        "active": "#42a5f5",
                        "disabled": "#b2e0f0"
                    }
                },
                {
                    "name": "success",
                    "pallete": {
                        "normal": "#68bd49",
                        "hover": "#49a42f",
                        "active": "#8bc34a",
                        "disabled": "#d1ebc8"
                    }
                },
                {
                    "name": "error",
                    "pallete": {
                        "normal": "#82b1ff",
                        "hover": "#c63836",
                        "active": "#f06292",
                        "disabled": "#f3cbcb"
                    }
                }
            ],
            "colors": {
              "background":"#f9f9fa",
              "lightBackground":"#e7ebee",
              "dark":"#242c39",
              "primary":"#4a5865",
              "secondary":"#8a989c",
              "error": "#b7c3d0",
              "text": "#9ba2a7",
              "default":"#efefef",
              "border": "#ddd",
              "card":"#f9f9fb"
            },
            "backgrounds": {
                "primary": "#fafafa",
                "secondary": "#E8E9EA",
                "highlight": "#f0f5f8"
            },
            "hovers": {
                "primary": "#212C34",
                "secondary": "#005ca3",
                "success": "#49a42f",
                "error": "#c63836",
                "text": "#5f6b73"
            },
            "active": {
                "primary": "#2c3942",
                "secondary": "#0099cc",
                "success": "#49a42f",
                "error": "#c63836",
                "text": "#f0f5f8"
            },
            "inactive": {
                "primary": "#c3c7ca",
                "secondary": "#b2e0f0",
                "success": "#d1ebc8",
                "error": "#f3cbcb"
            },
            "shadow": "0px 0px 12px -4px rgba(0,0,0,1)",
            "padding": {
                "small": "4px"
            }
        }
    },
    "user" : {},
    "players" : [],
    "compare" : {
      "selected": [],
      "team_a": [],
      "team_b": []
    },
    // timeframes [7, 15, 30, 365]
    "timeframes" : [7, 15, 30, 365],
    "categories": [
      'AST',
      'TOV',
      'PTS',
      'PF',
      'REB',
      'OREB',
      'DREB',
      '3P',
      'MIN',
      'GP',
      'BLK',
      'STL',
      'FTA',
      'FTM',
      'FT',
      'FGA',
      'FGM',
      'FG',
      'FG3A',
      'FG3M'
    ],
    "stats" : {
      "max" : {
        "reb" : "",
        "ast" : "",
        "pts" : "",
      }
    }

}
