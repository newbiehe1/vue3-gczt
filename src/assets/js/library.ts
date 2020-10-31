interface Date {
    formatCustorm: (formatStr: string) => string;
}
Date.prototype.formatCustorm = function (formatStr: string): string {
    const t: any = {
        "M+": this.getMonth() + 1, //月
        "d+": this.getDate(), //天
        "h+": this.getHours(), //24小时制 小时
        // "h+": this.getHours() > 12 ? this.getHours() - 12 : this.getHours(), //12小时制 小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
    };
    // 年
    if (new RegExp("(y+)").test(formatStr)) {
        formatStr = formatStr.replace(
            RegExp.$1,
            this.getFullYear()
                .toString()
                .substr(4 - RegExp.$1.length)
        );
    }
    // 周
    if (new RegExp("(w)").test(formatStr)) {
        formatStr = formatStr.replace(RegExp.$1, wtoString(this.getDay()));
    }
    function wtoString(code: number): string {
        let str = "";
        switch (code) {
            case 0:
                str = "天";
                break;
            case 1:
                str = "一";
                break;
            case 2:
                str = "二";
                break;
            case 3:
                str = "三";
                break;
            case 4:
                str = "四";
                break;
            case 5:
                str = "五";
                break;
            case 6:
                str = "六";
                break;
        }
        return str;
    }
    // 毫秒
    if (new RegExp("(ms)").test(formatStr)) {
        const ms = this.getMilliseconds();
        formatStr = formatStr.replace(
            RegExp.$1,
            ("000" + ms).substr(ms.toString().length)
        );
    }
    // 其他
    for (let a in t) {
        if (new RegExp("(" + a + ")").test(formatStr)) {
            formatStr = formatStr.replace(
                RegExp.$1,
                RegExp.$1.length > 1
                    ? ("00" + t[a]).substr(t[a].toString().length)
                    : t[a]
            );
        }
    }
    // 12小时制

    return formatStr;
};
