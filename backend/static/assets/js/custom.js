/**
 * The function `showLoader` displays a loader with a specified type and message.
 * @param [type=bg-none] - The `type` parameter is used to specify the type of loader to be displayed.
 * It has a default value of "bg-none", which likely indicates the background style of the loader.
 * @param [message=En cours...] - The `message` parameter in the `showLoader` function is a string that
 * represents the loading message that will be displayed while the loader is shown on the screen. In
 * the function call, if no message is provided, the default message "En cours..." will be displayed.
 */
function showLoader(type = "bg-none", message = "En cours...") {
  $("#loader").removeClass("d-none");
}

/**
 * The function hideLoader hides the loader element by adding the "d-none" class to it.
 */
function hideLoader() {
  $("#loader").addClass("d-none");
}

/**
 * The function `showError` displays an error message with a customizable title and default message
 * using the SweetAlert2 library.
 * @param [message=Une erreur est survenue] - The `message` parameter is the error message that will be
 * displayed in the error dialog box. If no message is provided, the default message "Une erreur est
 * survenue" will be displayed.
 * @param [title=Oops...] - The `title` parameter is used to specify the title of the error message
 * dialog box. By default, it is set to "Oops..." but you can customize it by passing a different value
 * when calling the `showError` function.
 */
function showError(message = "Une erreur est survenue", title = "Oops...") {
  Swal.fire({
    title: title,
    text: message,
    icon: 'error',
    confirmButtonColor: "#ffa500",
    confirmButtonText: 'Fermer'
  })

}

/**
 * The function `showConfirm` displays a confirmation dialog with customizable title, text, confirm
 * button text, and cancel button text, returning a boolean value based on user confirmation.
 * @returns The `showConfirm` function returns a Promise that resolves to a boolean value indicating
 * whether the user confirmed the action (true) or canceled it (false).
 */
function showConfirm({ title = "Are you sure?", text = "You won't be able to revert this!", confirmText = "Yes, delete it!", cancelText = "Annuler" }) {
  return Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: cancelText,
    confirmButtonText: confirmText,
  }).then((result) => result.isConfirmed);
}

/**
 * The function `showInfo` displays a success message with a specified title using SweetAlert2 library.
 * @param [message=Action terminé avec succés] - The `message` parameter is the text that will be
 * displayed in the dialog box as information or feedback to the user. If no message is provided when
 * calling the `showInfo` function, the default message "Action terminé avec succès" will be displayed.
 * @param [title=Infos] - The `title` parameter is used to specify the title of the message box that
 * will be displayed. By default, the title is set to "Infos".
 */
function showInfo(message = "Action terminé avec succés", title = "Infos") {
  Swal.fire({
    title: title,
    text: message,
    icon: 'success',
    confirmButtonColor: "#ffa500",
    confirmButtonText: 'Fermer'
  })
}

/**
 * The function `passwordToggle` toggles the visibility of a password input field when a specific box
 * is clicked.
 * @param box_id - The `box_id` parameter is used to identify the specific input field and toggle
 * button that are associated with the password toggle functionality. This function allows users to
 * toggle between showing the password in plain text and hiding it behind asterisks in a password input
 * field.
 */
function passwordToggle(box_id) {

  if ($(`${box_id} input`).attr("type") == "text") {

    $(`${box_id} input`).attr('type', 'password');
    $(`${box_id} a`).html("");
    $(`${box_id} a`).html(`<i class="fa fa-eye-slash text-secondary" aria-hidden="true"></i>`);
  } else if ($(`${box_id} input`).attr("type") == "password") {
    $(`${box_id} input`).attr('type', 'text');
    $(`${box_id} a`).html();
    $(`${box_id} a`).html(`<i class="fa fa-eye text-secondary" aria-hidden="true"></i>`);
  }
}

/**
 * Affiche un toast de succès avec une animation fluide et des couleurs uniformes.
 * @param {string} message - Le message de succès à afficher.
 */
function successToast(message) {
  // Sélection des éléments HTML
  const successToastElement = document.getElementById('success-toast');
  const successMessageElement = document.getElementById('success-message');

  // Mettre à jour le message dans le toast
  successMessageElement.textContent = message;

  // Créer une instance Bootstrap du toast
  const toast = new bootstrap.Toast(successToastElement, { animation: true });

  // Afficher le toast
  toast.show();

  // Masquer automatiquement après 3 secondes
  setTimeout(() => {
    toast.hide();
  }, 3000);
}

/**
 * The function `readFichierImage` reads an image file selected by the user, displays it on a specified
 * image element, and shows a specified action button.
 * @param e - The parameter `e` is typically an event object that is passed to the function when it is
 * triggered by an event, such as a file input change event in this case. It contains information about
 * the event that occurred, such as the target element and any associated data.
 * @param img_selector - The `img` parameter in the `readFichierImage` function is used to specify the selector
 * for the image element where the selected image will be displayed.
 * @param action - The `action` parameter in the `readFichierImage` function is a selector for the
 * action button element that will be displayed after an image is successfully loaded and displayed.
 * @param imgValue - The `imgValue` parameter in the `readFichierImage` function is used to store the
 * initial source attribute of the image element specified by the `img` parameter. This value is then
 * used to reset the image source back to its original value if an error occurs while reading the file
 * or if
 * @returns The `imgValue` variable is being returned from the `readFichierImage` function.
 */
function readFichierImage(e, img_selector, action = null, imgValue) {
  let img = $(`${img_selector}`)
  // let action_btn = $(`${action}`)
  // let car = $('#car')
  imgValue = img.attr('src')
  if (window.FileReader) {
    var file = e.target.files[0];
    var reader = new FileReader();
    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file);
    } else {
      img.attr('src', imgValue);
      alert('Erreur')
    }
    reader.onloadend = function (e) {
      img.attr('src', reader.result);
      // action_btn.css('display', '')

    }
  }
  return imgValue
}

// previewImage('logo', 'img')
function previewImage(inputId, imgId) {
  let img = $("#" + imgId);
  let imgValue = img.attr('src'); // Sauvegarde l'ancienne image

  function readFile(event) {
    if (window.FileReader) {
      let file = event.target.files[0];

      if (file && file.type.match('image.*')) {
        let reader = new FileReader();

        img.css('display', 'none'); // Cache l'image avant le chargement

        reader.onloadend = function () {
          img.attr('src', reader.result).css('display', '');
        };

        reader.readAsDataURL(file); // Lecture du fichier en base64
      } else {
        img.attr('src', imgValue); // Remet l'ancienne image
        alert('Erreur : Veuillez sélectionner une image valide.');
      }
    } else {
      alert('Votre navigateur ne supporte pas les File APIs.');
    }
  }

  // Vérifie si le navigateur supporte FileReader
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    $(document).on('change', `#${inputId}`, readFile);
  } else {
    alert('Les File APIs ne sont pas supportées par ce navigateur.');
  }
}

/**
 * Vérifie la taille, les dimensions et la netteté d'une image
 * @param {File} file - Le fichier image à vérifier
 * @param {number} maxSizeMB - Taille maximale autorisée en Mo
 * @param {number} minWidth - Largeur minimale requise
 * @param {number} minHeight - Hauteur minimale requise
 * @param {number} sharpnessThreshold - Seuil minimal de netteté (0 à 255)
 * @returns {Promise<{valid: boolean, message: string}>}
 */
function validateImage(file, maxSizeMB = 2, minWidth = 300, minHeight = 300, sharpnessThreshold = 20) {
  return new Promise((resolve) => {
    if (!file) {
      resolve({ valid: false, message: "Aucun fichier sélectionné." });
      return;
    }

    // Vérifier la taille du fichier
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      resolve({ valid: false, message: `L'image dépasse la taille maximale de ${maxSizeMB} Mo.` });
      return;
    }

    // Lire l'image pour vérifier ses dimensions et sa netteté
    const img = new Image();
    const objectURL = URL.createObjectURL(file);

    img.onload = function () {
      const width = img.width;
      const height = img.height;

      // Vérifier les dimensions
      if (width < minWidth || height < minHeight) {
        resolve({ valid: false, message: `L'image doit être au minimum de ${minWidth}x${minHeight} pixels.` });
        return;
      }

      // Vérifier la netteté avec Canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      let totalSharpness = 0;
      let count = 0;

      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        // Calculer la différence entre les pixels voisins
        if (i > 4) {
          const prevR = pixels[i - 4];
          const prevG = pixels[i - 3];
          const prevB = pixels[i - 2];

          const sharpness =
            Math.abs(r - prevR) +
            Math.abs(g - prevG) +
            Math.abs(b - prevB);

          totalSharpness += sharpness;
          count++;
        }
      }

      const averageSharpness = totalSharpness / count;
      console.log(averageSharpness);
      // Vérifier si l'image est trop floue
      if (averageSharpness < sharpnessThreshold) {
        resolve({ valid: false, message: "L'image semble trop floue." });
        return;
      }

      resolve({ valid: true, message: "L'image est valide." });
    };

    img.onerror = function () {
      resolve({ valid: false, message: "Impossible de charger l'image." });
    };

    img.src = objectURL;
  });
}

/**
 * The function `date_format_to_fr` converts a date string to a French date format with optional time
 * display.
 * @param str - The function `date_format_to_fr` takes a string `str` as input, which represents a date
 * in a specific format. The function then converts this date to a French date format and returns the
 * formatted date string.
 * @returns The function `date_format_to_fr` takes a date string as input, converts it to a Date
 * object, and then formats it in French locale. If the input string contains a 'T' character
 * (indicating a time component), the formatted date includes the day, month, year, hour, and minute in
 * 24-hour format. If the input string does not contain a 'T' character
 */
function date_format_to_fr(str) {
  if (str) {
    var date = new Date(str);
    if (str.includes('T')) {
      var formattedDate = date.toLocaleString("fr-FR", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false
      });
      return formattedDate;
    } else {
      var formattedDate = date.toLocaleString("fr-FR", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
        // hour12: false
      });
      return formattedDate;
    }

  } else {
    return;
  }
}

/**
 * The function `formatDateForInput` converts a date object or string into a formatted string suitable
 * for input fields, with an option to include time information.
 * @param date - The `date` parameter can be either a Date object or a string representing a date. If
 * it's a string, the function will convert it to a Date object before formatting it.
 * @param [isDateOnly=false] - The `isDateOnly` parameter is a boolean flag that determines whether the
 * formatted date should include only the date part (year, month, day) or both date and time parts
 * (year, month, day, hours, minutes).
 * @returns The `formatDateForInput` function returns a formatted date string based on the input date
 * and the `isDateOnly` parameter. If `isDateOnly` is `true`, the function returns the date in the
 * format "YYYY-MM-DD" for date input fields. If `isDateOnly` is `false` or not provided, the function
 * returns the date and time in the format "
 */
function formatDateForInput(date, isDateOnly = false) {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  if (isNaN(date.getTime())) {
    throw new Error("Date invalide");
  }

  var year = date.getFullYear();
  var month = (date.getMonth() + 1).toString().padStart(2, "0");
  var day = date.getDate().toString().padStart(2, "0");

  if (isDateOnly) {
    // Format pour les champs 'date'
    return `${year}-${month}-${day}`;
  } else {
    // Format pour les champs 'datetime-local'
    var hours = date.getHours().toString().padStart(2, "0");
    var minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}

/**
 * The function `capitalizeInput` capitalizes the first letter of the input value and converts the rest
 * of the letters to lowercase as the user types in an input field selected by the provided selector.
 * @param selector - The `selector` parameter in the `capitalizeInput` function is a string that
 * specifies the target input elements on which the capitalization functionality will be applied. It is
 * used to select the input elements using jQuery syntax. For example, if you want to target all input
 * elements with the class "input-field
 */
function capitalizeInput(selector) {
  $(document).on('input', selector, function () {
    const value = $(this).val();
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); // Capitalise la première lettre
    $(this).val(capitalizedValue);
  });
}

/**
 * The function `upperInput` listens for input events on a specified selector and converts the input
 * value to uppercase.
 * @param selector - The `selector` parameter in the `upperInput` function is a string that specifies
 * the target element or elements on which the input event listener will be attached. It is used to
 * select the input elements to which the function will apply the functionality of converting input
 * text to uppercase as the user types.
 */
function upperInput(selector) {
  $(document).on('input', selector, function () {
    const capitalizedValue = $(this).val().toUpperCase(); // Tout mettre en majuscules
    $(this).val(capitalizedValue);
  });
}

/**
 * The function `lowerInput` converts the input value of a specified selector to lowercase as the user
 * types.
 * @param selector - The `selector` parameter in the `lowerInput` function is used to specify the
 * target element(s) on which the input event listener will be attached. It is a string that represents
 * a valid CSS selector to target the desired input element(s) on the webpage. For example, it could be
 * a
 */
function lowerInput(selector) {
  $(document).on('input', selector, function () {
    const capitalizedValue = $(this).val().toLowerCase(); // Tout mettre en majuscules
    $(this).val(capitalizedValue);
  });
}



/**
 * The `initTomSelect` function initializes a new instance of TomSelect with specific configuration
 * options.
 * @param selector - The `selector` parameter in the `initTomSelect` function is used to specify the
 * target element or elements where the TomSelect instance will be initialized. It typically refers to
 * a CSS selector that identifies the element(s) on the page where you want the TomSelect dropdown to
 * be applied. For example
 */
function initTomSelect(selector, create = false) {
  // Créer une nouvelle instance de TomSelect
  new TomSelect(selector, {
    create: create, // Empêche l'ajout d'options manuelles
    plugins: ["remove_button"], // Permet de supprimer des options
  });
}

/**
 * The function `destroyTomSelect` destroys an existing instance of TomSelect if it exists.
 * @param selector - The `selector` parameter in the `destroyTomSelect` function is a string that
 * represents the CSS selector for the element that contains the TomSelect instance that you want to
 * destroy. It is used to target the specific element on the page where the TomSelect instance is
 * initialized.
 */
function destroyTomSelect(selector) {
  // Détruire l'instance existante de TomSelect si elle existe
  if ($(selector)[0].tomselect) {
    $(selector)[0].tomselect.destroy();
  }
}

/**
 * Initialise un élément <select> avec Choices.js
 * @param {string} selectSelector - Le sélecteur CSS de l'élément <select> à initialiser.
 * @param {Object} options - Les options de configuration pour Choices.js (optionnel).
 */
function initializeChoices(selectSelector, options = {}) {
  // Trouver l'élément <select> dans le DOM
  const selectElement = document.querySelector(selectSelector);

  if (!selectElement) {
    console.error(`L'élément "${selectSelector}" n'a pas été trouvé.`);
    return;
  }

  // Détruire toute instance existante avant d'en créer une nouvelle
  destroyChoices(selectSelector);

  // Options par défaut pour Choices.js
  const defaultOptions = {
    removeItemButton: true,
    searchEnabled: true,
    placeholder: true,
    placeholderValue: "Sélectionnez une option",
    noResultsText: "Aucun résultat trouvé",
    noChoicesText: "Aucune option disponible",
    itemSelectText: "Cliquez pour sélectionner",
  };

  // Fusionner les options par défaut avec les options personnalisées
  const finalOptions = { ...defaultOptions, ...options };

  // Initialiser Choices.js sur l'élément <select> et stocker l'instance
  selectElement.choicesInstance = new Choices(selectElement, finalOptions);
}

/**
 * Détruit une instance de Choices.js sur un élément <select>
 * @param {string} selectSelector - Le sélecteur CSS de l'élément <select>.
 */
function destroyChoices(selectSelector) {
  // Sélectionner l'élément <select>
  const selectElement = document.querySelector(selectSelector);

  if (!selectElement) {
    console.error(`L'élément "${selectSelector}" n'a pas été trouvé.`);
    return;
  }

  // Vérifier si l'élément a une instance de Choices enregistrée
  if (selectElement.choicesInstance) {
    selectElement.choicesInstance.destroy();
    delete selectElement.choicesInstance; // Supprimer la référence
    console.log(`Instance de Choices détruite pour "${selectSelector}".`);
  } else {
    console.warn(`Aucune instance de Choices trouvée sur "${selectSelector}".`);
  }
}

/**
 * The function `isValidEmail` destroys an existing instance of TomSelect if it exists.
 * @param selector - The `selector` parameter in the `isValidEmail` function is a string that
 * check if email is valid or non
*/
function isValidEmail(selector) {
  const email = $(selector).val();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Initialise un Swiper avec options personnalisées.
 * @param {string} mainSelector - Sélecteur CSS du Swiper principal.
 * @param {string} thumbsSelector - (Optionnel) Sélecteur du Swiper des miniatures.
 * @param {Object} options - Options personnalisées pour Swiper.
 */
function initSwiper(mainSelector, thumbsSelector = null, options = {}) {
  // Configuration par défaut
  const defaultOptions = {
    autoHeight: false,
    spaceBetween: 5,
    loop: true,
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  // Gestion des miniatures (thumbs)
  if (thumbsSelector) {
    defaultOptions.thumbs = {
      swiper: new Swiper(thumbsSelector, {
        spaceBetween: 5,
        slidesPerView: 5,
        freeMode: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
      }),
    };
  }

  // Fusion des options par défaut avec celles fournies
  const finalOptions = { ...defaultOptions, ...options };

  // Initialisation du Swiper principal
  return new Swiper(mainSelector, finalOptions);
}

/**
 * Initialise un éditeur SunEditor sur un élément donné.
 * @param {string} id - L'ID de l'élément sur lequel appliquer SunEditor (par défaut "commentaire").
 * @returns {Object} - Instance de l'éditeur.
 */
function initEditor(id = "commentaire") {
  const buttonConfig = [
    ['undo', 'redo'],
    [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
    ['fontColor', 'hiliteColor', 'textStyle'],
    ['removeFormat'],
    ['outdent', 'indent'],
    ['align', 'horizontalRule', 'list', 'lineHeight'],
    ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template'],
    ['-right', ':r-More Rich-default.more_plus', 'table', 'imageGallery'],
    ['-right', 'image', 'video', 'audio', 'link'],
    ['%992', [
      ['undo', 'redo'],
      [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
      ['bold', 'underline', 'italic', 'strike'],
      [':t-More Text-default.more_text', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
      ['removeFormat'],
      ['outdent', 'indent'],
      ['align', 'horizontalRule', 'list', 'lineHeight'],
      ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template'],
      ['-right', ':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio', 'imageGallery']
    ]],
    ['%767', [
      ['undo', 'redo'],
      [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
      [':t-More Text-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
      ['removeFormat'],
      ['outdent', 'indent'],
      [':e-More Line-default.more_horizontal', 'align', 'horizontalRule', 'list', 'lineHeight'],
      [':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio', 'imageGallery'],
      ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template']
    ]],
    ['%480', [
      ['undo', 'redo'],
      [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
      [':t-More Text-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle', 'removeFormat'],
      [':e-More Line-default.more_horizontal', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'lineHeight'],
      [':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio', 'imageGallery'],
      ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template']
    ]]
  ];

  return SUNEDITOR.create(id, {
    minHeight: "300px",
    buttonList: buttonConfig,
    // lang: SUNEDITOR_LANG['fr'], // Décommente si tu veux la langue française
  });
}

/**
* Détruit une instance de SunEditor proprement.
* @param {string} id - L'ID de l'éditeur à détruire.
*/
function destroyEditor(id = "commentaire") {
  const editorInstance = SUNEDITOR.instances[id];

  if (editorInstance) {
    editorInstance.destroy();
    delete SUNEDITOR.instances[id]; // Supprime la référence
    console.log(`L'éditeur "${id}" a été détruit.`);
  } else {
    console.warn(`Aucune instance SunEditor trouvée pour "${id}".`);
  }
}