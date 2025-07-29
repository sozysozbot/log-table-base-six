function calc(k, { precision, leading_len }) {
    const len = k.length;
    const list = [..."012345"]
        .map(c => {
            const a = Math.round((Math.log(parseInt(k + c, 6)) / Math.log(6) - len) * 6 ** precision).toString(6).padStart(precision, "0");

            return { leading: a.slice(0, leading_len), trailing: a.slice(leading_len, precision) }
        });

    return [list[0].leading, list.map(({ leading, trailing }) => {
        return leading === list[0].leading ? `<span style="visibility: hidden;">*</span>${trailing}` : `*${trailing}`
    })]
}

function print_row(k,
    { isBold, hide_leftmost, final } = { isBold: false, hide_leftmost: false, final: false },
) {
    const len = k.length;
    const [leading, trailing_list] = calc(k,
        len === 5 ? { precision: 9, leading_len: 4 } : { precision: 6, leading_len: 0 }
        );
    const padding = final ? ' style="padding-bottom: 5px;"' : '';
    return `            <tr${isBold ? ` style="font-weight: bold;"` : ''}>
                <td${padding}><span${hide_leftmost ? ' style="visibility: hidden;"' : ''}>${k.slice(0, len - 2)}</span> ${k.slice(len - 2, len)}</td>
                <td${padding}>${leading}${trailing_list[0]}</td>
                <td${padding}>${trailing_list[1]}</td>
                <td${padding}>${trailing_list[2]}</td>
                <td${padding}>${trailing_list[3]}</td>
                <td${padding}>${trailing_list[4]}</td>
                <td${padding}>${trailing_list[5]}</td>
            </tr>`;
}

function print_six_rows(k2) {
    return [
        print_row(k2 + "0", { isBold: true }),
        print_row(k2 + "1", { hide_leftmost: true }),
        print_row(k2 + "2", { hide_leftmost: true }),
        print_row(k2 + "3", { hide_leftmost: true }),
        print_row(k2 + "4", { hide_leftmost: true }),
        print_row(k2 + "5", { hide_leftmost: true, final: true })
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


function gen2() {

    fs.writeFileSync('back.html', `<html>

<head>
    <link rel="stylesheet" href="table.css">
    <style>
    @page {
        margin: 2% 10.5% 2% 10.5% !important;
    }
    </style>
    <title>Log table (base six)</title>
</head>

<body>
    <div style="text-align: center; margin-bottom: 1em;">
        <b style="font-variant-caps: small-caps; font-size: 2em;">Logarithm Table for Base Six</b><br>
        <span style="font-size: 1.5em;">written in base six</span><br>
    </div>

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
            ${print_six_rows("1")}
            ${print_six_rows("2")}
            ${print_six_rows("3")}
            ${print_six_rows("4")}
            ${print_six_rows("5")}
        </tbody>
    </table>
    <div style="text-align: center; margin-top: 1em;">
        <span style="font-size: 1em;">Author: Hirotaka Sato (@hsjoihs)</span>
    </div>
</body>

</html>`);
}

gen2();