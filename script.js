const galleries = {
  casa: [
    "galeria/ia/01_fachada_noturna_familia_2_carros_sem_numero.jpg",
    "galeria/ia/02_fachada_diurna_familia_2_carros_sem_numero.jpg",
    "galeria/ia/03_sala_pe_direito_duplo_familia.jpg",
    "galeria/ia/04_sala_integrada_familia.jpg",
    "galeria/ia/05_cozinha_integrada_familia.jpg",
    "galeria/ia/06_area_gourmet_piscina_familia.jpg",
    "galeria/ia/07_area_gourmet_familia.jpg",
    "galeria/ia/08_piscina_fundos_familia.jpg",
    "galeria/ia/09_piscina_lazer_familia.jpg",
    "galeria/ia/10_suite_master_casal.jpg",
    "galeria/ia/11_suite_ambientada.jpg",
    "galeria/ia/12_quarto_infantil_ambientado.jpg",
    "galeria/ia/13_escritorio_familia_pet.jpg",
    "galeria/ia/15_terraco_familia_pet.jpg",
    "galeria/foto-casa-00-fachada-principal-sem-numero.png",
    "galeria/foto-casa-08-sem-numero.jpg",
    "galeria/foto-casa-45.jpg",
    "galeria/foto-casa-48.jpg",
    "galeria/foto-casa-10.jpg",
    "galeria/foto-casa-02.jpg",
    "galeria/foto-casa-19.jpg",
    "galeria/foto-casa-03.jpg",
    "galeria/foto-casa-04.jpg",
    "galeria/foto-casa-28.jpg",
    "galeria/foto-casa-09.jpg",
    "galeria/foto-casa-13.jpg",
    "galeria/foto-casa-17.jpg",
    "galeria/foto-casa-26.jpg",
    "galeria/foto-casa-27.jpg",
    "galeria/foto-casa-12.jpg",
    "galeria/foto-casa-14.jpg",
    "galeria/foto-casa-15.jpg",
    "galeria/foto-casa-25.jpg",
    "galeria/foto-casa-21.jpg",
    "galeria/foto-casa-41.jpg",
    "galeria/foto-casa-46.jpg",
    "galeria/foto-casa-47.jpg",
    "galeria/foto-casa-01.jpg",
    "galeria/foto-casa-05.jpg",
    "galeria/foto-casa-06.jpg",
    "galeria/foto-casa-11.jpg",
    "galeria/foto-casa-23.jpg",
    "galeria/foto-casa-24.jpg",
    "galeria/foto-casa-34.jpg",
    "galeria/foto-casa-38.jpg",
    "galeria/foto-casa-33.jpg",
    "galeria/foto-casa-35.jpg",
    "galeria/foto-casa-36.jpg",
    "galeria/foto-casa-07.jpg",
    "galeria/foto-casa-29.jpg",
    "galeria/foto-casa-30.jpg",
    "galeria/foto-casa-37.jpg",
    "galeria/foto-casa-39.jpg",
    "galeria/foto-casa-40.jpg",
    "galeria/foto-casa-42.jpg",
    "galeria/foto-casa-43.jpg",
    "galeria/foto-casa-44.jpg",
    "galeria/foto-casa-31.jpg",
    "galeria/foto-casa-32.jpg",
    "galeria/foto-casa-16.jpg",
    "galeria/foto-casa-18.jpg",
    "galeria/foto-casa-20.jpg",
    "galeria/foto-casa-22.jpg"
  ],
  clube: Array.from(
    { length: 14 },
    (_, index) => `assets/clube/clube-${String(index + 1).padStart(2, "0")}.jpg`
  )
};

const leadConfig = {
  propertyCode: "BBC001",
  propertyTitle: "Casa Alphaville II",
  gallery: "casa"
};

let showLeadPromptForPhoto = () => {};

document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupPropertyLeadPrompt();
  setupLightbox();
  setupWhatsAppTracking();
});

function setupMobileMenu() {
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".site-header .nav");
  const toggle = document.querySelector(".menu-toggle");

  if (!nav || !toggle) return;

  const setMenuState = (open) => {
    document.body.classList.toggle("mobile-menu-open", open);
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };

  setMenuState(false);

  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    setMenuState(!document.body.classList.contains("mobile-menu-open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("click", (event) => {
    if (!document.body.classList.contains("mobile-menu-open")) return;
    if (header?.contains(event.target)) return;
    setMenuState(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuState(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) setMenuState(false);
  });
}

function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  const image = document.getElementById("lightbox-img");
  const count = document.getElementById("lightbox-count");
  const closeButton = document.querySelector(".lightbox-close");
  const previousButton = document.querySelector(".lightbox-prev");
  const nextButton = document.querySelector(".lightbox-next");

  if (!lightbox || !image || !count || !closeButton || !previousButton || !nextButton) return;

  let currentGallery = "casa";
  let currentIndex = 0;

  const render = () => {
    const items = galleries[currentGallery];
    image.src = items[currentIndex];
    image.alt = `Foto ampliada ${currentIndex + 1} de ${items.length}`;
    count.textContent = `${currentIndex + 1} / ${items.length}`;
  };

  const open = (gallery, index) => {
    if (!galleries[gallery]) return;
    currentGallery = gallery;
    currentIndex = index;
    render();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    closeButton.focus();
    showLeadPromptForPhoto(currentGallery, currentIndex);
  };

  const close = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
  };

  const move = (direction) => {
    const items = galleries[currentGallery];
    currentIndex = (currentIndex + direction + items.length) % items.length;
    render();
    showLeadPromptForPhoto(currentGallery, currentIndex);
  };

  document.querySelectorAll(".photo-card").forEach((button) => {
    button.addEventListener("click", () => {
      open(button.dataset.gallery, Number(button.dataset.index));
    });
  });

  closeButton.addEventListener("click", close);
  previousButton.addEventListener("click", () => move(-1));
  nextButton.addEventListener("click", () => move(1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("open")) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowRight") move(1);
    if (event.key === "ArrowLeft") move(-1);
  });
}

function setupPropertyLeadPrompt() {
  const prompt = document.getElementById("property-lead-prompt");
  const closeButton = prompt?.querySelector(".lead-prompt-close");
  const form = document.getElementById("lead-prompt-form");
  const status = document.getElementById("lead-form-status");
  const success = document.getElementById("lead-success");

  if (!prompt || !closeButton || !form || !status || !success) return;

  const storageKey = `bb-lead-prompted:${leadConfig.propertyCode}`;

  const closePrompt = () => {
    prompt.classList.remove("open");
    window.setTimeout(() => {
      prompt.hidden = true;
    }, 180);
  };

  showLeadPromptForPhoto = (gallery, index) => {
    if (gallery !== leadConfig.gallery || index !== 3) return;

    try {
      if (window.sessionStorage.getItem(storageKey)) return;
      window.sessionStorage.setItem(storageKey, "true");
    } catch {
      // O convite continua funcionando quando o navegador bloqueia o armazenamento.
    }

    prompt.hidden = false;
    window.requestAnimationFrame(() => prompt.classList.add("open"));
    window.setTimeout(() => form.elements.name?.focus(), 200);
  };

  closeButton.addEventListener("click", closePrompt);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const submitButton = form.querySelector(".lead-submit");
    const formData = new FormData(form);
    const searchParams = new URLSearchParams(window.location.search);

    status.textContent = "";
    status.classList.remove("error");
    submitButton.disabled = true;
    submitButton.textContent = "Registrando...";

    try {
      const response = await fetch("https://www.bbconsultoriaimoveis.com.br/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyCode: leadConfig.propertyCode,
          name: formData.get("name"),
          phone: formData.get("phone"),
          consent: formData.get("consent") === "on",
          company: formData.get("company"),
          sourcePage: window.location.href,
          referrer: document.referrer || null,
          utmSource: searchParams.get("utm_source"),
          utmMedium: searchParams.get("utm_medium"),
          utmCampaign: searchParams.get("utm_campaign"),
          utmTerm: searchParams.get("utm_term"),
          utmContent: searchParams.get("utm_content"),
          gclid: searchParams.get("gclid")
        })
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Não foi possível registrar seu contato.");
      }

      form.hidden = true;
      success.hidden = false;

      if (typeof window.gtag === "function") {
        window.gtag("event", "landing_lead_created", {
          property_name: leadConfig.propertyTitle,
          property_code: leadConfig.propertyCode,
          transport_type: "beacon"
        });
      }
    } catch (error) {
      status.textContent = error instanceof Error
        ? error.message
        : "Não foi possível registrar seu contato.";
      status.classList.add("error");
      submitButton.disabled = false;
      submitButton.textContent = "Receber informações";
    }
  });
}

function setupWhatsAppTracking() {
  document.querySelectorAll('a[href*="wa.me/"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      if (typeof window.gtag !== "function") return;

      const ctaLocation = link.dataset.ctaLocation || "nao_identificado";

      // Evento analítico para GA4
      window.gtag("event", "generate_lead", {
        event_category: "WhatsApp",
        event_label: "Casa Alphaville II",
        cta_location: ctaLocation,
        link_url: link.href,
        transport_type: "beacon"
      });

      // Evento auxiliar específico
      window.gtag("event", "whatsapp_click", {
        property_name: "Casa Alphaville II",
        cta_location: ctaLocation,
        transport_type: "beacon"
      });

      // Conversão oficial do Google Ads
      window.gtag("event", "conversion", {
        send_to: "AW-18217048699/fHmNCKmp2rkcEPu0yO5D",
        value: 1.0,
        currency: "BRL",
        transport_type: "beacon"
      });
    });
  });
}
