// client-side javascript for question 4 goes here
$(document).ready(function () {
    $(".edit").on("click", function() {
        var text = this.innerText
        this.innerHTML = `<input type="text" value="${text}" autofocus>`
    })

    $(".edit").on("change", async function() {
        var text = this.firstElementChild.value
        this.innerHTML = text

        await $.ajax({
            type: "POST",
            url: "/editReason",
            data: {text: text, id: this.id}
        })
    })
})