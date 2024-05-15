for (var n = 1; n <= 10; n++) {
    document.write('<table>');
    document.write('<tr><th colspan="2">Produtos de ' + n + '</th></tr>');
    for (var i = 1; i <= 10; i++) {
        document.write('<tr><td>' + n + ' x ' + i + '</td><td>' + n * i + '</td></tr>');
    }
    document.write('</table>');
}