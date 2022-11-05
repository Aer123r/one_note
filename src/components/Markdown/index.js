import "vditor/dist/index.css";
import React, { useState} from "react";
import Vditor from "vditor";

const Index = ({value,onRef,keydown}) => {

    const [vd, setVd] = useState();
    React.useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',(e)=>{
            let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
            vditor.setTheme(isDarkMode?'dark':'classic',isDarkMode?'dark':'light');

        });
        const vditor = new Vditor("vditor", {
            after: () => {
                vditor.setValue(value);
                setVd(vditor);
                onRef((value)=>{
                    vditor.setValue(value);
                });
            },
            width:'70vw',
            height:'100vh',
            comment:{
                enable:true
            },
            theme:window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'classic',
            cache:{
                id:'vditor'
            },
            preview:{
                theme:{
                    current:window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light',
                },
            },
            hint: {
              emoji: {
                  "+1":                                   "👍",
                  "-1":                                   "👎",
                  "100":                                  "💯",
                  "1234":                                 "🔢",
                  "1st_place_medal":                      "🥇",
                  "2nd_place_medal":                      "🥈",
                  "3rd_place_medal":                      "🥉",
                  "8ball":                                "🎱",
                  "a":                                    "🅰️",
                  "ab":                                   "🆎",
                  "abc":                                  "🔤",
                  "abcd":                                 "🔡",
                  "Accept":                               "🉑",
                  "aerial_tramway":                       "🚡",
                  "afghanistan":                          "🇦🇫",
                  "airplane":                             "✈️",
                  "aland_islands":                        "🇦🇽",
                  "alarm_clock":                          "⏰",
                  "albania":                              "🇦🇱",
                  "alembic":                              "⚗️",
                  "algeria":                              "🇩🇿",
                  "alien":                                "👽",
                  "ambulance":                            "🚑",
                  "american_samoa":                       "🇦🇸",
                  "amphora":                              "🏺",
                  "anchor":                               "⚓️",
                  "andorra":                              "🇦🇩",
                  "angel":                                "👼",
                  "anger":                                "💢",
                  "angola":                               "🇦🇴",
                  "angry":                                "😠",
                  "anguilla":                             "🇦🇮",
                  "anguished":                            "😧",
                  "ant":                                  "🐜",
                  "antarctica":                           "🇦🇶",
                  "antigua_barbuda":                      "🇦🇬",
                  "apple":                                "🍎",
                  "aquarius":                             "♒️",
                  "argentina":                            "🇦🇷",
                  "aries":                                "♈️",
                  "armenia":                              "🇦🇲",
                  "arrow_backward":                       "◀️",
                  "arrow_double_down":                    "⏬",
                  "arrow_double_up":                      "⏫",
                  "arrow_down":                           "⬇️",
                  "arrow_down_small":                     "🔽",
                  "arrow_forward":                        "▶️",
                  "arrow_heading_down":                   "⤵️",
                  "arrow_heading_up":                     "⤴️",
                  "arrow_left":                           "⬅️",
                  "arrow_lower_left":                     "↙️",
                  "arrow_lower_right":                    "↘️",
                  "arrow_right":                          "➡️",
                  "arrow_right_hook":                     "↪️",
                  "arrow_up":                             "⬆️",
                  "arrow_up_down":                        "↕️",
                  "arrow_up_small":                       "🔼",
                  "arrow_upper_left":                     "↖️",
                  "arrow_upper_right":                    "↗️",
                  "arrows_clockwise":                     "🔃",
                  "arrows_counterclockwise":              "🔄",
                  "art":                                  "🎨",
                  "articulated_lorry":                    "🚛",
                  "artificial_satellite":                 "🛰",
                  "aruba":                                "🇦🇼",
                  "asterisk":                             "*️⃣",
                  "astonished":                           "😲",
                  "athletic_shoe":                        "👟",
                  "atm":                                  "🏧",
                  "atom_symbol":                          "⚛️",
                  "australia":                            "🇦🇺",
                  "austria":                              "🇦🇹",
                  "avocado":                              "🥑",
                  "azerbaijan":                           "🇦🇿",
                  "b":                                    "🅱️",
                  "baby":                                 "👶",
                  "baby_bottle":                          "🍼",
                  "baby_chick":                           "🐤",
                  "baby_symbol":                          "🚼",
                  "back":                                 "🔙",
                  "bacon":                                "🥓",
                  "badminton":                            "🏸",
                  "baggage_claim":                        "🛄",
                  "baguette_bread":                       "🥖",
                  "bahamas":                              "🇧🇸",
                  "bahrain":                              "🇧🇭",
                  "balance_scale":                        "⚖️",
                  "balloon":                              "🎈",
                  "ballot_box":                           "🗳",
                  "ballot_box_with_check":                "☑️",
                  "bamboo":                               "🎍",
                  "banana":                               "🍌",
                  "bangbang":                             "‼️",
                  "bangladesh":                           "🇧🇩",
                  "bank":                                 "🏦",
                  "bar_chart":                            "📊",
                  "barbados":                             "🇧🇧",
                  "barber":                               "💈",
                  "baseball":                             "⚾️",
                  "basketball":                           "🏀",
                  "basketball_man":                       "⛹",
                  "basketball_woman":                     "⛹️‍♀️",
                  "bat":                                  "🦇",
                  "bath":                                 "🛀",
                  "bathtub":                              "🛁",
                  "battery":                              "🔋",
                  "beach_umbrella":                       "🏖",
                  "bear":                                 "🐻",
                  "bed":                                  "🛏",
                  "bee":                                  "🐝",
                  "beer":                                 "🍺",
                  "beers":                                "🍻",
                  "beetle":                               "🐞",
                  "beginner":                             "🔰",
                  "belarus":                              "🇧🇾",
                  "belgium":                              "🇧🇪",
                  "belize":                               "🇧🇿",
                  "bell":                                 "🔔",
                  "bellhop_bell":                         "🛎",
                  "benin":                                "🇧🇯",
                  "bento":                                "🍱",
                  "bermuda":                              "🇧🇲",
                  "bhutan":                               "🇧🇹",
                  "bicyclist":                            "🚴",
                  "bike":                                 "🚲",
                  "biking_man":                           "🚴",
                  "biking_woman":                         "🚴‍♀",
                  "bikini":                               "👙",
                  "biohazard":                            "☣️",
                  "bird":                                 "🐦",
                  "birthday":                             "🎂",
                  "black_circle":                         "⚫️",
                  "black_flag":                           "🏴",
                  "black_heart":                          "🖤",
                  "black_joker":                          "🃏",
                  "black_large_square":                   "⬛️",
                  "black_medium_small_square":            "◾️",
                  "black_medium_square":                  "◼️",
                  "black_nib":                            "✒️",
                  "black_small_square":                   "▪️",
                  "black_square_button":                  "🔲",
                  "blonde_man":                           "👱",
                  "blonde_woman":                         "👱‍♀",
                  "blossom":                              "🌼",
                  "blowfish":                             "🐡",
                  "blue_book":                            "📘",
                  "blue_car":                             "🚙",
                  "blue_heart":                           "💙",
                  "blush":                                "😊",
                  "boar":                                 "🐗",
                  "boat":                                 "⛵️",
                  "bolivia":                              "🇧🇴",
                  "bomb":                                 "💣",
                  "book":                                 "📖",
                  "bookmark":                             "🔖",
                  "bookmark_tabs":                        "📑",
                  "books":                                "📚",
                  "boom":                                 "💥",
                  "boot":                                 "👢",
                  "bosnia_herzegovina":                   "🇧🇦",
                  "botswana":                             "🇧🇼",
                  "bouquet":                              "💐",
                  "bow":                                  "🙇",
                  "bow_and_arrow":                        "🏹",
                  "bowing_man":                           "🙇",
                  "bowing_woman":                         "🙇‍♀",
                  "bowling":                              "🎳",
                  "boxing_glove":                         "🥊",
                  "boy":                                  "👦",
                  "brazil":                               "🇧🇷",
                  "bread":                                "🍞",
                  "bride_with_veil":                      "👰",

              }
            },
            // upload:{
            //     url: '/api/file/vditor',
            //     filename(name) {
            //         return 'file';
            //     },
            //
            // }
        });
    }, []);
    return  <div style={{display:"flex"}}>
        <div id={'vditor'} className="vditor"
             onKeyUp={()=>{keydown(vd.getValue())}}
        />
    </div>;
};
export default Index;