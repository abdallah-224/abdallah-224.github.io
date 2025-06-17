document.addEventListener("DOMContentLoaded", function () {
  // Animation des barres de compétences
  const sectionCompetences = document.querySelector(".competences");
  if (sectionCompetences) {
    const barresCompetences = document.querySelectorAll(".barre-competence");

    const observateur = new IntersectionObserver(
      (entrees) => {
        entrees.forEach((entree) => {
          if (entree.isIntersecting) {
            barresCompetences.forEach((barre) => {
              const niveau = barre.getAttribute("data-niveau");
              barre.style.width = niveau;
            });
            observateur.unobserve(entree.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observateur.observe(sectionCompetences);
  }

  // Validation du formulaire de contact
  const formulaireContact = document.getElementById("formulaireContact");
  if (formulaireContact) {
    const champNom = formulaireContact.querySelector("#nom");
    const champEmail = formulaireContact.querySelector("#email");
    const champMessage = formulaireContact.querySelector("#message");
    const boutonSoumettre = formulaireContact.querySelector(
      'button[type="submit"]'
    );

    function validerNom() {
      const nom = champNom.value.trim();
      if (nom === "") {
        afficherErreur(champNom, "Le nom est requis");
        return false;
      } else if (nom.length < 2) {
        afficherErreur(champNom, "Le nom doit contenir au moins 2 caractères");
        return false;
      } else {
        afficherSucces(champNom);
        return true;
      }
    }

    function validerEmail() {
      const email = champEmail.value.trim();
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email === "") {
        afficherErreur(champEmail, "L'email est requis");
        return false;
      } else if (!regexEmail.test(email)) {
        afficherErreur(champEmail, "Veuillez entrer un email valide");
        return false;
      } else {
        afficherSucces(champEmail);
        return true;
      }
    }

    function validerMessage() {
      const message = champMessage.value.trim();
      if (message === "") {
        afficherErreur(champMessage, "Le message est requis");
        return false;
      } else if (message.length < 10) {
        afficherErreur(
          champMessage,
          "Le message doit contenir au moins 10 caractères"
        );
        return false;
      } else {
        afficherSucces(champMessage);
        return true;
      }
    }

    function afficherErreur(element, message) {
      const groupe = element.parentElement;
      const affichageErreur = groupe.querySelector(".message-erreur");

      if (!affichageErreur) {
        const elementErreur = document.createElement("small");
        elementErreur.className = "message-erreur";
        elementErreur.textContent = message;
        groupe.appendChild(elementErreur);
      } else {
        affichageErreur.textContent = message;
      }

      element.classList.add("erreur");
      element.classList.remove("succes");
    }

    function afficherSucces(element) {
      const groupe = element.parentElement;
      const affichageErreur = groupe.querySelector(".message-erreur");

      if (affichageErreur) {
        affichageErreur.remove();
      }

      element.classList.add("succes");
      element.classList.remove("erreur");
    }

    // Écouteurs d'événements
    champNom.addEventListener("input", validerNom);
    champEmail.addEventListener("input", validerEmail);
    champMessage.addEventListener("input", validerMessage);

    formulaireContact.addEventListener("submit", function (e) {
      e.preventDefault();

      const estNomValide = validerNom();
      const estEmailValide = validerEmail();
      const estMessageValide = validerMessage();

      if (estNomValide && estEmailValide && estMessageValide) {
        boutonSoumettre.disabled = true;
        boutonSoumettre.textContent = "Envoi en cours...";

        setTimeout(() => {
          alert(
            "Merci pour votre message! Je vous répondrai dès que possible."
          );
          formulaireContact.reset();
          boutonSoumettre.disabled = false;
          boutonSoumettre.textContent = "Envoyer";
        }, 1500);
      }
    });
  }
});
