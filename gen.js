function calc(k, len = 5) {
    const list = [..."012345"]
        .map(c => {
            const precision = 9;
            const a = Math.round((Math.log(parseInt(k + c, 6)) / Math.log(6) - len) * 6 ** precision).toString(6).padStart(precision, "0");

            return { leading: a.slice(0, 4), trailing: a.slice(4, precision) }
        });

    return [list[0].leading, list.map(({ leading, trailing }) => {
        return leading === list[0].leading ? `<span style="visibility: hidden;">*</span>${trailing}` : `*${trailing}`
    })]
}

function print_row(k,
    { isBold, hide_leftmost, final } = { isBold: false, hide_leftmost: false, final: false },
    len = 5
) {
    const [leading, trailing_list] = calc(k, len);
    const padding = final ? ' style="padding-bottom: 5px;"' : '';
    return `            <tr${isBold ? ` style="font-weight: bold;"` : ''}>
                <td${padding}><span${hide_leftmost ? ' style="visibility: hidden;"' : ''}>${k.slice(0, 3)}</span> ${k.slice(3, 5)}</td>
                <td${padding}>${leading}${trailing_list[0]}</td>
                <td${padding}>${trailing_list[1]}</td>
                <td${padding}>${trailing_list[2]}</td>
                <td${padding}>${trailing_list[3]}</td>
                <td${padding}>${trailing_list[4]}</td>
                <td${padding}>${trailing_list[5]}</td>
            </tr>`;
}

function print_six_rows(k2, len = 4) {
    return [
        print_row(k2 + "0", { isBold: true }, len + 1),
        print_row(k2 + "1", { hide_leftmost: true }, len + 1),
        print_row(k2 + "2", { hide_leftmost: true }, len + 1),
        print_row(k2 + "3", { hide_leftmost: true }, len + 1),
        print_row(k2 + "4", { hide_leftmost: true }, len + 1),
        print_row(k2 + "5", { hide_leftmost: true, final: true }, len + 1)
    ].join("\n");
}

const fs = require('fs');

function gen(k2) {

    fs.writeFileSync(k2 + '.html', `<html>

<head>
    <link rel="stylesheet" href="table.css">
    <title>Log table (base six)</title>
</head>

<body>
    <table>
        <thead>
            <tr style="text-align: center;">
                <td></td>
                <td>0</td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
            </tr>
        </thead>
        <tbody style="text-align: right">
${print_six_rows(k2 + "0")}
            ${print_six_rows(k2 + "1")}
            ${print_six_rows(k2 + "2")}
            ${print_six_rows(k2 + "3")}
            ${print_six_rows(k2 + "4")}
            ${print_six_rows(k2 + "5")}
        </tbody>
    </table>
</body>

</html>`);
}

const FILES = [];

for (let i = 1; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
        for (let k = 0; k < 6; k++) {
            gen(`${i}${j}${k}`);
            FILES.push(`${i}${j}${k}.html`);
        }
    }
}

// console.log(JSON.stringify(FILES, null, 2));