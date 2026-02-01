$(function () {
    const BASE_URL = "/client";

    // Fonction pour gérer l'affichage/masquage de l'input
    function toggleInput(checkboxId, inputId) {
        $('#' + checkboxId).change(function () {
            if ($(this).is(':checked')) {
                $('#' + inputId).removeClass('d-none').addClass('d-block');
            } else {
                $('#' + inputId).removeClass('d-block').addClass('d-none');
            }
        });
    }
    // Appliquer la fonctionnalité aux checkboxes existantes
    toggleInput('is_auto', 'nep-block');

    // Fonction générique pour afficher les notifications
    function handleAjaxResponse(response, successMessage) {
        hideLoader();
        response.status === 1 ? successToast(response.message || successMessage) : showError(response.message || "Une erreur est survenue.");
    }

    $("#add_customer_form").on("submit", function (e) {
        e.preventDefault();
        showLoader();
        console.log(`${BASE_URL}/create`);
        
        const formData = $(this).serialize();
        $.ajax({
            url: `${BASE_URL}/add`,
            type: "POST",
            data: formData,
            success: function (response) {
                if (response.status === 1) {
                    $("#add_customer_form")[0].reset();
                    $('#add_customer').modal('hide');
                    
                    handleAjaxResponse(response, "Les données de l'accessoire ont été enrégistrer succès.");

                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                    
                }
                
            },
            error: function (response) {
                hideLoader();
                showError(response.responseJSON.message || "Une erreur est survenue lors de la mise à jour des données.");
            },
        });
    });
});