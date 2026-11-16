(() => {
  "use strict";

  const keys = {
    jobs: "conectau.jobs",
    companies: "conectau.companies",
    applications: "conectau.applications",
    categories: "conectau.categories",
    profile: "conectau.profile",
    session: "conectau.session",
    saved: "conectau.saved"
  };

  const defaultJobs = [
    { id: "job-ux", title: "Diseñador/a UX Junior", company: "NovaTech", location: "Guayaquil", type: "Tiempo completo", modality: "Híbrido", salary: "$700", category: "Diseño", description: "Ayuda a crear experiencias digitales intuitivas junto a un equipo multidisciplinario.", active: true, color: "blue", initial: "N" },
    { id: "job-dev", title: "Desarrollador/a web trainee", company: "Pixel Studio", location: "Remoto", type: "Prácticas", modality: "Remoto", salary: "$450", category: "Tecnología", description: "Participa en proyectos web reales y aprende con profesionales del sector.", active: true, color: "purple", initial: "P" },
    { id: "job-marketing", title: "Asistente de marketing digital", company: "Marea Creativa", location: "Guayaquil", type: "Medio tiempo", modality: "Híbrido", salary: "$500", category: "Marketing", description: "Apoya campañas digitales, generación de contenido y análisis de resultados.", active: true, color: "orange", initial: "M" },
    { id: "job-data", title: "Pasante de análisis de datos", company: "Andes Finance", location: "Quito", type: "Prácticas", modality: "Presencial", salary: "$400", category: "Finanzas", description: "Convierte datos en hallazgos que ayuden a tomar mejores decisiones.", active: true, color: "green", initial: "A" },
    { id: "job-content", title: "Creador/a de contenido", company: "Marea Creativa", location: "Remoto", type: "Freelance", modality: "Remoto", salary: "$350", category: "Marketing", description: "Crea contenido atractivo para marcas y comunidades digitales.", active: true, color: "orange", initial: "M" },
    { id: "job-support", title: "Soporte técnico junior", company: "NovaTech", location: "Guayaquil", type: "Tiempo completo", modality: "Presencial", salary: "$600", category: "Tecnología", description: "Colabora con el equipo técnico y brinda soporte a usuarios internos.", active: true, color: "blue", initial: "N" }
  ];

  const defaultCities = [
    "Ambato", "Azogues", "Babahoyo", "Cayambe", "Chone", "Cuenca", "Daule", "Durán",
    "El Coca", "Esmeraldas", "Guaranda", "Guayaquil", "Ibarra", "La Libertad", "Latacunga",
    "Loja", "Macas", "Machala", "Manta", "Milagro", "Nueva Loja", "Otavalo", "Portoviejo",
    "Puyo", "Quevedo", "Quito", "Riobamba", "Salinas", "Samborondón", "Santa Elena",
    "Santo Domingo", "Tena", "Tulcán", "Zamora"
  ];

  const defaultCompanies = [
    { id: "company-nova", name: "NovaTech", sector: "Tecnología e innovación", location: "Guayaquil", description: "Creamos soluciones digitales para los retos de hoy.", initial: "N", color: "blue" },
    { id: "company-pixel", name: "Pixel Studio", sector: "Diseño y tecnología", location: "Remoto", description: "Estudio creativo enfocado en productos digitales.", initial: "P", color: "purple" },
    { id: "company-marea", name: "Marea Creativa", sector: "Marketing y comunicación", location: "Guayaquil", description: "Ideas frescas que conectan marcas con personas.", initial: "M", color: "orange" },
    { id: "company-andes", name: "Andes Finance", sector: "Finanzas", location: "Quito", description: "Servicios financieros con foco en innovación.", initial: "A", color: "green" }
  ];

  const defaultCategories = [
    { id: "cat-tech", name: "Tecnología", active: true },
    { id: "cat-marketing", name: "Marketing", active: true },
    { id: "cat-finance", name: "Finanzas", active: true },
    { id: "cat-design", name: "Diseño", active: true },
    { id: "cat-business", name: "Administración", active: true }
  ];

  const get = (key, fallback) => {
    const stored = localStorage.getItem(key);
    if (stored === null) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(fallback) ? (Array.isArray(parsed) ? parsed : fallback) : (parsed && typeof parsed === "object" ? parsed : fallback);
    } catch (error) {
      console.error(`No se pudo leer el almacenamiento ${key}.`, error);
      return fallback;
    }
  };

  const save = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`No se pudo guardar el almacenamiento ${key}.`, error);
      showToast("No se pudieron guardar los cambios. Revisa el almacenamiento del navegador.");
      return false;
    }
  };

  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);

  const uid = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const jobs = () => get(keys.jobs, defaultJobs);
  const companies = () => get(keys.companies, defaultCompanies);
  const applications = () => get(keys.applications, []);
  const categories = () => get(keys.categories, defaultCategories);
  const profile = () => get(keys.profile, { name: "Jordy Manuel Agudo", email: "estudiante@universidad.edu.ec", role: "Estudiante", degree: "", phone: "", location: "", bio: "", skills: "" });

  function showToast(message) {
    const old = document.querySelector(".toast");
    if (old) old.remove();
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.textContent = message;
    document.body.append(toast);
    window.setTimeout(() => toast.remove(), 3200);
  }

  function showModal(title, content, onSubmit) {
    closeModal();
    const backdrop = document.createElement("div");
    backdrop.className = "app-modal-overlay";
    backdrop.innerHTML = `<section class="app-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="app-modal-header"><h2 id="modal-title">${escapeHtml(title)}</h2><button class="app-modal-close" type="button" aria-label="Cerrar">×</button></div>${content}</section>`;
    document.body.append(backdrop);
    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop || event.target.closest(".app-modal-close")) closeModal();
    });
    backdrop.addEventListener("submit", (event) => {
      const form = event.target.closest("form");
      if (!form) return;
      event.preventDefault();
      onSubmit(new FormData(form));
    });
    const firstInput = backdrop.querySelector("input, select, textarea, button");
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    const modal = document.querySelector(".app-modal-overlay");
    if (modal) modal.remove();
  }

  function logoClass(color) {
    const known = ["blue", "purple", "orange", "green"];
    return `company-logo logo-${known.includes(color) ? color : "blue"}`;
  }

  function cardMarkup(job, canManage, savedList) {
    const saved = savedList.includes(job.id);
    const controls = canManage
      ? `<button class="icon-button" type="button" data-edit-job="${escapeHtml(job.id)}">Editar</button><button class="icon-button danger" type="button" data-delete-job="${escapeHtml(job.id)}">Eliminar</button>`
      : `<button class="button button-primary button-small" type="button" data-apply-job="${escapeHtml(job.id)}">Postularme <i class="hgi-stroke hgi-arrow-right-01" aria-hidden="true"></i></button>`;
    return `<article class="job-card">
      <div class="job-card-top"><div class="job-company"><span class="${logoClass(job.color)}">${escapeHtml(job.initial || job.company.slice(0, 1))}</span><div><strong>${escapeHtml(job.company)}</strong><small>${escapeHtml(job.location)}</small></div></div><button class="bookmark-button${saved ? " saved" : ""}" type="button" aria-label="${saved ? "Quitar de guardados" : "Guardar vacante"}" aria-pressed="${saved}" data-save-job="${escapeHtml(job.id)}"><i class="hgi-stroke hgi-bookmark-01" aria-hidden="true"></i></button></div>
      <h3>${escapeHtml(job.title)}</h3><p class="job-description">${escapeHtml(job.description)}</p>
      <div class="job-pills"><span>${escapeHtml(job.type)}</span><span>${escapeHtml(job.modality)}</span><span>${escapeHtml(job.category)}</span></div>
      <div class="job-card-bottom"><span class="salary"><strong>${escapeHtml(job.salary)}</strong> / mes</span><div class="table-actions">${controls}</div></div>
    </article>`;
  }

  function renderFeatured() {
    const target = document.querySelector("[data-featured-jobs]");
    if (!target) return;
    const saved = get(keys.saved, []);
    target.innerHTML = jobs().filter((job) => job.active).slice(0, 3).map((job) => cardMarkup(job, false, saved)).join("");
  }

  function renderLocationOptions() {
    const options = document.querySelector("[data-location-options]");
    const input = document.querySelector("[data-location-filter]");
    const label = document.querySelector("[data-location-label]");
    if (!options || !input || !label) return;

    const activeJobs = jobs().filter((job) => job.active);
    const locations = [...new Set([...defaultCities, ...activeJobs
      .map((job) => String(job.location || "").trim())
      .filter((item) => item && item.toLowerCase() !== "remoto")])]
      .sort((a, b) => a.localeCompare(b, "es"));
    const modalities = [...new Set(activeJobs
      .map((job) => String(job.modality || "").trim())
      .filter(Boolean))]
      .sort((a, b) => a.localeCompare(b, "es"));
    const selected = new URLSearchParams(location.search).get("location") || "";
    const locationOptions = locations.map((item) => `<button class="location-option" type="button" data-location-option="${escapeHtml(item)}" aria-pressed="${item === selected}">${escapeHtml(item)}</button>`).join("");
    const modalityOptions = modalities.map((item) => `<button class="location-option" type="button" data-location-option="${escapeHtml(item)}" aria-pressed="${item === selected}">${escapeHtml(item)}</button>`).join("");

    options.innerHTML = `<button class="location-option" type="button" data-location-option="" aria-pressed="${!selected}">Cualquier ubicación</button>
      <p class="location-group-title">Ciudades</p>${locationOptions}
      <p class="location-group-title">Modalidades</p>${modalityOptions}`;
    input.value = selected;
    label.textContent = selected || "Ubicación";
  }

  function renderJobs() {
    const target = document.querySelector("[data-all-jobs]");
    if (!target) return;
    const search = (document.querySelector("[data-job-search]")?.value || new URLSearchParams(location.search).get("q") || "").trim().toLowerCase();
    const searchInput = document.querySelector("[data-job-search]");
    if (searchInput && !searchInput.value && new URLSearchParams(location.search).get("q")) searchInput.value = new URLSearchParams(location.search).get("q");
    const type = document.querySelector("[data-job-type]")?.value || "";
    const modality = document.querySelector("[data-job-modality]")?.value || "";
    const locationFilter = (new URLSearchParams(location.search).get("location") || "").toLowerCase();
    const available = jobs().filter((job) => {
      const jobLocation = String(job.location || "").trim().toLowerCase();
      const jobModality = String(job.modality || "").trim().toLowerCase();
      return job.active
        && (!search || [job.title, job.company, job.category, job.location, job.description].join(" ").toLowerCase().includes(search))
        && (!locationFilter || jobLocation === locationFilter || jobModality === locationFilter)
        && (!type || job.type === type)
        && (!modality || job.modality === modality);
    });
    const count = document.querySelector("[data-job-count]");
    if (count) count.textContent = `${available.length} ${available.length === 1 ? "vacante disponible" : "vacantes disponibles"}`;
    target.innerHTML = available.length ? available.map((job) => cardMarkup(job, false, get(keys.saved, []))).join("") : `<div class="empty-state" style="grid-column:1/-1"><strong>No encontramos vacantes</strong>Prueba con otros términos o filtros.</div>`;
  }

  function jobFormMarkup(job = {}) {
    const categoryOptions = categories().map((category) => `<option ${category.name === job.category ? "selected" : ""}>${escapeHtml(category.name)}</option>`).join("");
    const typeOptions = ["Tiempo completo", "Medio tiempo", "Prácticas", "Freelance"].map((item) => `<option ${item === job.type ? "selected" : ""}>${item}</option>`).join("");
    const modalityOptions = ["Híbrido", "Remoto", "Presencial"].map((item) => `<option ${item === job.modality ? "selected" : ""}>${item}</option>`).join("");
    return `<form data-modal-form><div class="form-grid">
      <div class="form-field full"><label for="job-title">Nombre del puesto <span class="required">*</span></label><input class="input-control" id="job-title" name="title" value="${escapeHtml(job.title)}" required></div>
      <div class="form-field"><label for="job-company-name">Empresa <span class="required">*</span></label><input class="input-control" id="job-company-name" name="company" value="${escapeHtml(job.company)}" required></div>
      <div class="form-field"><label for="job-category">Categoría <span class="required">*</span></label><select class="select-control" id="job-category" name="category" required>${categoryOptions || "<option>Tecnología</option>"}</select></div>
      <div class="form-field"><label for="job-location">Ubicación</label><input class="input-control" id="job-location" name="location" value="${escapeHtml(job.location)}" placeholder="Ciudad o remoto"></div>
      <div class="form-field"><label for="job-salary">Salario mensual</label><input class="input-control" id="job-salary" name="salary" value="${escapeHtml(job.salary)}" placeholder="$500"></div>
      <div class="form-field"><label for="job-type-select">Tipo de empleo</label><select class="select-control" id="job-type-select" name="type">${typeOptions}</select></div>
      <div class="form-field"><label for="job-modality-select">Modalidad</label><select class="select-control" id="job-modality-select" name="modality">${modalityOptions}</select></div>
      <div class="form-field full"><label for="job-description">Descripción <span class="required">*</span></label><textarea class="textarea-control" id="job-description" name="description" rows="3" required>${escapeHtml(job.description)}</textarea></div>
    </div><div class="form-actions"><button class="button button-outline" type="button" data-cancel-modal>Cancelar</button><button class="button button-primary" type="submit">Guardar vacante <i class="hgi-stroke hgi-arrow-right-01" aria-hidden="true"></i></button></div></form>`;
  }

  function openJobForm(job) {
    const isEdit = Boolean(job);
    showModal(isEdit ? "Editar vacante" : "Publicar nueva vacante", jobFormMarkup(job || {}), (formData) => {
      const current = jobs();
      const values = Object.fromEntries(formData.entries());
      const next = { ...values, active: true, initial: values.company.slice(0, 1).toUpperCase(), color: job?.color || "blue" };
      if (isEdit) {
        save(keys.jobs, current.map((item) => item.id === job.id ? { ...item, ...next } : item));
        showToast("La vacante se actualizó correctamente.");
      } else {
        current.unshift({ id: uid("job"), ...next });
        if (!save(keys.jobs, current)) return;
        showToast("Vacante publicada. Ya aparece en el listado.");
      }
      closeModal();
      renderAll();
    });
    document.querySelector("[data-cancel-modal]")?.addEventListener("click", closeModal);
  }

  function applyToJob(id) {
    const job = jobs().find((item) => item.id === id);
    if (!job) return;
    const current = applications();
    if (current.some((item) => item.jobId === id)) {
      showToast("Ya te postulaste a esta vacante. Revisa el estado en Mis postulaciones.");
      return;
    }
    const user = profile();
    current.unshift({ id: uid("application"), jobId: id, title: job.title, company: job.company, category: job.category, date: new Intl.DateTimeFormat("es-EC", { dateStyle: "medium" }).format(new Date()), status: "Pendiente", applicant: user.name, email: user.email });
    if (!save(keys.applications, current)) return;
    showToast("Postulación enviada. Puedes seguir su estado en Mis postulaciones.");
    renderAll();
  }



  function renderCompanies() {
    const target = document.querySelector("[data-company-cards]");
    if (!target) return;
    const query = (document.querySelector("[data-company-search]")?.value || "").trim().toLowerCase();
    const list = companies().filter((item) => [item.name, item.sector, item.location].join(" ").toLowerCase().includes(query));
    const count = document.querySelector("[data-company-count]");
    if (count) count.textContent = `${companies().length} organizaciones registradas en Conecta U.`;
    target.innerHTML = list.length ? list.map((company) => `<article class="company-card"><span class="${logoClass(company.color)}">${escapeHtml(company.initial || company.name.slice(0, 1))}</span><h3>${escapeHtml(company.name)}</h3><p>${escapeHtml(company.sector)} · ${escapeHtml(company.location)}</p><p>${escapeHtml(company.description || "")}</p><div class="table-actions"><button class="icon-button" type="button" data-edit-company="${escapeHtml(company.id)}">Editar perfil</button><button class="icon-button danger" type="button" data-delete-company="${escapeHtml(company.id)}">Eliminar</button></div></article>`).join("") : `<div class="empty-state" style="grid-column:1/-1"><strong>Sin resultados</strong>Prueba con otro nombre o sector.</div>`;
    const activeCount = document.querySelector("[data-active-jobs-count]");
    const appCount = document.querySelector("[data-all-applications-count]");
    const companyCount = document.querySelector("[data-companies-count]");
    if (activeCount) activeCount.textContent = jobs().filter((job) => job.active).length;
    if (appCount) appCount.textContent = applications().length;
    if (companyCount) companyCount.textContent = companies().length;
  }

  function companyFormMarkup(company = {}) {
    return `<form data-modal-form><div class="form-grid">
      <div class="form-field full"><label for="company-name">Nombre de la empresa <span class="required">*</span></label><input class="input-control" id="company-name" name="name" value="${escapeHtml(company.name)}" required></div>
      <div class="form-field"><label for="company-sector">Sector <span class="required">*</span></label><input class="input-control" id="company-sector" name="sector" value="${escapeHtml(company.sector)}" required placeholder="Tecnología"></div>
      <div class="form-field"><label for="company-location">Ubicación</label><input class="input-control" id="company-location" name="location" value="${escapeHtml(company.location)}" placeholder="Guayaquil"></div>
      <div class="form-field full"><label for="company-description">Descripción</label><textarea class="textarea-control" id="company-description" name="description" rows="3">${escapeHtml(company.description)}</textarea></div>
    </div><div class="form-actions"><button class="button button-outline" type="button" data-cancel-modal>Cancelar</button><button class="button button-primary" type="submit">Guardar empresa <i class="hgi-stroke hgi-arrow-right-01" aria-hidden="true"></i></button></div></form>`;
  }

  function openCompanyForm(company) {
    showModal(company ? "Editar perfil empresarial" : "Registrar empresa", companyFormMarkup(company || {}), (formData) => {
      const values = Object.fromEntries(formData.entries());
      const current = companies();
      if (company) {
        save(keys.companies, current.map((item) => item.id === company.id ? { ...item, ...values, initial: values.name.slice(0, 1).toUpperCase() } : item));
        showToast("El perfil de empresa se actualizó.");
      } else {
        current.unshift({ id: uid("company"), ...values, initial: values.name.slice(0, 1).toUpperCase(), color: "green" });
        if (!save(keys.companies, current)) return;
        showToast("Empresa registrada correctamente.");
      }
      closeModal();
      renderAll();
    });
    document.querySelector("[data-cancel-modal]")?.addEventListener("click", closeModal);
  }



  function renderApplications() {
    const target = document.querySelector("[data-applications-table]");
    if (!target) return;
    const filter = document.querySelector("[data-application-filter].active")?.dataset.applicationFilter || "Todas";
    const list = applications().filter((item) => filter === "Todas" || item.status === filter);
    const stats = document.querySelector("[data-application-stats]");
    if (stats) {
      const all = applications();
      stats.innerHTML = `<div class="stat-card"><span>Postulaciones enviadas</span><strong>${all.length}</strong></div><div class="stat-card"><span>En revisión</span><strong>${all.filter((app) => app.status === "En revisión").length}</strong></div><div class="stat-card"><span>Respuestas recibidas</span><strong>${all.filter((app) => ["Aceptada", "Rechazada"].includes(app.status)).length}</strong></div>`;
    }
    target.innerHTML = list.length ? list.map((app) => {
      const status = app.status === "Aceptada" ? "status-accepted" : app.status === "En revisión" ? "status-review" : app.status === "Rechazada" ? "status-rejected" : "status-pending";
      return `<tr><td><span class="table-primary">${escapeHtml(app.title)}</span><span class="table-secondary">${escapeHtml(app.category || "Oportunidad laboral")}</span></td><td>${escapeHtml(app.company)}</td><td>${escapeHtml(app.date)}</td><td><span class="status-pill ${status}">${escapeHtml(app.status)}</span></td><td><button class="icon-button danger" type="button" data-delete-application="${escapeHtml(app.id)}">Retirar</button></td></tr>`;
    }).join("") : `<tr><td colspan="5"><div class="empty-state"><strong>Aún no tienes postulaciones</strong>Cuando encuentres una oportunidad, podrás seguir su estado aquí.<br><br><a class="inline-link" href="vacantes.html">Explorar vacantes <i class="hgi-stroke hgi-arrow-right-01" aria-hidden="true"></i></a></div></td></tr>`;
  }

  function renderAdmin() {
    const stats = document.querySelector("[data-admin-stats]");
    const report = document.querySelector("[data-report-table]");
    const categoryTarget = document.querySelector("[data-categories-table]");
    if (!stats && !report && !categoryTarget) return;
    const allJobs = jobs();
    const allCompanies = companies();
    const allApplications = applications();
    if (stats) stats.innerHTML = `<div class="stat-card"><span>Vacantes activas</span><strong>${allJobs.filter((job) => job.active).length}</strong></div><div class="stat-card"><span>Empresas aliadas</span><strong>${allCompanies.length}</strong></div><div class="stat-card"><span>Postulaciones</span><strong>${allApplications.length}</strong></div>`;
    if (report) report.innerHTML = `<tr><td>Vacantes activas</td><td><span class="table-primary">${allJobs.filter((job) => job.active).length}</span></td><td>Oportunidades publicadas actualmente</td></tr><tr><td>Empresas registradas</td><td><span class="table-primary">${allCompanies.length}</span></td><td>Perfiles empresariales disponibles</td></tr><tr><td>Postulaciones</td><td><span class="table-primary">${allApplications.length}</span></td><td>${allApplications.filter((app) => app.status === "En revisión").length} en proceso de revisión</td></tr><tr><td>Categorías activas</td><td><span class="table-primary">${categories().filter((item) => item.active).length}</span></td><td>Áreas profesionales habilitadas</td></tr>`;
    if (categoryTarget) categoryTarget.innerHTML = categories().map((category) => {
      const attached = allJobs.filter((job) => job.category === category.name).length;
      return `<tr><td><span class="table-primary">${escapeHtml(category.name)}</span></td><td>${attached}</td><td><span class="status-pill ${category.active ? "status-active" : "status-inactive"}">${category.active ? "Activa" : "Inactiva"}</span></td><td><div class="table-actions"><button class="icon-button" type="button" data-edit-category="${escapeHtml(category.id)}">Editar</button><button class="icon-button danger" type="button" data-toggle-category="${escapeHtml(category.id)}">${category.active ? "Desactivar" : "Activar"}</button></div></td></tr>`;
    }).join("");
  }

  function openCategoryForm(category) {
    showModal(category ? "Editar categoría" : "Nueva categoría", `<form data-modal-form><div class="form-field"><label for="category-name">Nombre de categoría <span class="required">*</span></label><input class="input-control" id="category-name" name="name" value="${escapeHtml(category?.name || "")}" required></div><div class="form-actions"><button class="button button-outline" type="button" data-cancel-modal>Cancelar</button><button class="button button-primary" type="submit">Guardar categoría <i class="hgi-stroke hgi-arrow-right-01" aria-hidden="true"></i></button></div></form>`, (formData) => {
      const name = String(formData.get("name")).trim();
      const current = categories();
      if (current.some((item) => item.name.toLowerCase() === name.toLowerCase() && item.id !== category?.id)) {
        showToast("Ya existe una categoría con ese nombre.");
        return;
      }
      if (category) save(keys.categories, current.map((item) => item.id === category.id ? { ...item, name } : item));
      else {
        current.push({ id: uid("cat"), name, active: true });
        if (!save(keys.categories, current)) return;
      }
      closeModal();
      renderAll();
      showToast("Categoría guardada correctamente.");
    });
    document.querySelector("[data-cancel-modal]")?.addEventListener("click", closeModal);
  }

  function renderProfile() {
    const form = document.querySelector("[data-profile-form]");
    if (!form) return;
    const data = profile();
    for (const [name, value] of Object.entries(data)) {
      const field = form.elements.namedItem(name);
      if (field) field.value = value;
    }
    const displayName = document.querySelector("[data-profile-name]");
    const displayEmail = document.querySelector("[data-profile-email]");
    const initials = document.querySelector("[data-profile-initials]");
    if (displayName) displayName.textContent = data.name || "Tu nombre";
    if (displayEmail) displayEmail.textContent = data.email || "tu-correo@ejemplo.com";
    if (initials) initials.textContent = (data.name || "JR").split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  }



  function renderAll() {
    renderLocationOptions();
    renderFeatured();
    renderJobs();
    renderCompanies();
    renderApplications();
    renderAdmin();
    renderProfile();
  }

  document.addEventListener("click", (event) => {
    const picker = document.querySelector("[data-location-picker]");
    if (picker && !picker.contains(event.target)) picker.open = false;

    const target = event.target.closest("button, a");
    if (!target) return;
    if (target.hasAttribute("data-location-option")) {
      const value = target.dataset.locationOption;
      document.querySelector("[data-location-filter]").value = value;
      document.querySelector("[data-location-label]").textContent = value || "Ubicación";
      document.querySelector("[data-location-picker]").open = false;
      document.querySelectorAll("[data-location-option]").forEach((option) => {
        option.setAttribute("aria-pressed", String(option === target));
      });
      return;
    }
    if (target.matches(".menu-toggle")) {
      const nav = document.querySelector(".main-nav");
      const open = nav?.classList.toggle("is-open") || false;
      target.setAttribute("aria-expanded", String(open));
      return;
    }
    if (target.hasAttribute("data-open-job-form")) return openJobForm();
    if (target.hasAttribute("data-open-company-form")) return openCompanyForm();
    if (target.hasAttribute("data-open-category-form")) return openCategoryForm();
    if (target.hasAttribute("data-apply-job")) return applyToJob(target.dataset.applyJob);
    if (target.hasAttribute("data-edit-job")) return openJobForm(jobs().find((item) => item.id === target.dataset.editJob));
    if (target.hasAttribute("data-delete-job")) {
      const id = target.dataset.deleteJob;
      if (window.confirm("¿Eliminar esta vacante? Las postulaciones anteriores se conservarán en el historial.")) {
        if (save(keys.jobs, jobs().filter((item) => item.id !== id))) {
          renderAll();
          showToast("Vacante eliminada.");
        }
      }
      return;
    }
    if (target.hasAttribute("data-save-job")) {
      const id = target.dataset.saveJob;
      const saved = get(keys.saved, []);
      const next = saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id];
      if (save(keys.saved, next)) renderAll();
      return;
    }
    if (target.hasAttribute("data-edit-company")) return openCompanyForm(companies().find((item) => item.id === target.dataset.editCompany));
    if (target.hasAttribute("data-delete-company")) {
      const id = target.dataset.deleteCompany;
      if (window.confirm("¿Eliminar este perfil de empresa? Las vacantes publicadas se conservarán.")) {
        if (save(keys.companies, companies().filter((item) => item.id !== id))) {
          renderAll();
          showToast("Perfil de empresa eliminado.");
        }
      }
      return;
    }
    if (target.hasAttribute("data-delete-application")) {
      const id = target.dataset.deleteApplication;
      if (window.confirm("¿Retirar esta postulación?")) {
        if (save(keys.applications, applications().filter((item) => item.id !== id))) {
          renderAll();
          showToast("Postulación retirada del historial.");
        }
      }
      return;
    }
    if (target.hasAttribute("data-application-filter")) {
      event.preventDefault();
      document.querySelectorAll("[data-application-filter]").forEach((tab) => tab.classList.toggle("active", tab === target));
      renderApplications();
      return;
    }
    if (target.hasAttribute("data-edit-category")) return openCategoryForm(categories().find((item) => item.id === target.dataset.editCategory));
    if (target.hasAttribute("data-toggle-category")) {
      const id = target.dataset.toggleCategory;
      const updated = categories().map((item) => item.id === id ? { ...item, active: !item.active } : item);
      if (save(keys.categories, updated)) {
        renderAll();
        showToast("Estado de categoría actualizado.");
      }
    }
  });

  document.addEventListener("input", (event) => {
    if (event.target.matches("[data-job-search], [data-job-type], [data-job-modality]")) renderJobs();
    if (event.target.matches("[data-company-search]")) renderCompanies();
  });
  document.addEventListener("change", (event) => {
    if (event.target.matches("[data-job-search], [data-job-type], [data-job-modality]")) renderJobs();
  });

  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (form.matches("[data-profile-form]")) {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(form).entries());
      if (save(keys.profile, values)) {
        renderProfile();
        showToast("Perfil guardado correctamente.");
      }
    }
    if (form.matches("[data-login-form]")) {
      event.preventDefault();
      const data = new FormData(form);
      const user = { email: String(data.get("email")).trim(), name: profile().name };
      if (save(keys.session, user)) {
        showToast("Sesión de demostración iniciada.");
        window.setTimeout(() => { location.href = "../postulaciones.html"; }, 500);
      }
    }
    if (form.matches("[data-register-form]")) {
      event.preventDefault();
      const data = new FormData(form);
      const userProfile = { ...profile(), name: String(data.get("name")).trim(), email: String(data.get("email")).trim(), role: String(data.get("role")) };
      if (save(keys.profile, userProfile) && save(keys.session, { email: userProfile.email, name: userProfile.name, role: userProfile.role })) {
        showToast("Cuenta de demostración creada.");
        window.setTimeout(() => { location.href = userProfile.role === "Empresa" ? "../empresas.html" : "../perfil.html"; }, 500);
      }
    }
  });

  renderAll();
})();
