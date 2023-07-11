/* funcionabilidad Boton Mostrar Formulario de Comentarios*/
$("#post-comment").hide();

$("#btn-toggle-comment").click((e) => {
  e.preventDefault();
  $("#post-comment").slideToggle();
});


/* funcionabilidad Boton Likes */
$("#btn-like").click(function (e) {
  e.preventDefault();
  let imgId = $(this).data("id");

  $.post("/images/" + imgId + "/like").done((data) => {
    console.log(data);
    $(".likes-count").text(data.likes);
  });
});

/* funcionabilidad Boton Delete */
$("#btn-delete").click(function (e) {
  e.preventDefault();
  let $this = $(this);
  const response = confirm("¿Seguro de Eliminar la Imagen?");
  if (response) {
    let imgId = $this.data("id");
    $.ajax({
      url: "/images/" + imgId,
      type: "DELETE",
    }).done(function (resultado) {
      $this.removeClass("btn-danger").addClass("btn-success");
      $this.find("i").removeClass("fa-times").addClass("fa-check");
      $this.append("<span>!</span>");
    });
  }
});
