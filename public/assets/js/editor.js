$(function () {
    $.getJSON("test.json", function(data) {
        let cells = data.data;
        console.log(cells);

        $("#contents").append($('<table>'));
        for (let i = 0; i < cells.length; i++) {
            $("#contents").append($('<tr>'));
            for (let j = 0; j < cells[i].length; j++) {
                let html = $('<td>').text(cells[i][j]);
                $("#contents").append(html);
            }
            $("#contents").append($('</tr>'));
        }
        $("#contents").append($('</table>'));
    });
});


