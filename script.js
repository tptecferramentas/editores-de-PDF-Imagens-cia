// ==========================================
// 1. CARREGAMENTO DA PÁGINA
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('page-loader');
    loader.style.opacity = '0';
    
    setTimeout(() => {
        loader.style.display = 'none';
    }, 400);
});

// ==========================================
// 2. CONTROLE DO MODAL DE ORÇAMENTO
// ==========================================
const openBudgetBtn = document.getElementById('open-budget-modal');
const budgetModal = document.getElementById('budget-modal');
const closeBudgetBtn = document.getElementById('close-budget');
const contactForm = document.getElementById('contact-form');

if (openBudgetBtn && budgetModal) {
    openBudgetBtn.addEventListener('click', () => {
        budgetModal.classList.add('active');
    });

    closeBudgetBtn.addEventListener('click', () => {
        budgetModal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === budgetModal) {
            budgetModal.classList.remove('active');
        }
    });
}

// ==========================================
// 3. ENVIO DO ORÇAMENTO (FORMSUBMIT)
// ==========================================
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const submitBtn = document.getElementById('submit-btn');
        submitBtn.innerText = "Enviando solicitação..."; 
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        fetch("https://formsubmit.co/ajax/tptectecnologias@gmail.com", {
            method: "POST",
            headers: { 
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert("✅ Solicitação enviada com sucesso! Entraremos em contato em breve.");
            budgetModal.classList.remove('active');
            contactForm.reset(); 
        })
        .catch(error => {
            alert("❌ Ocorreu um erro ao enviar. Verifique sua conexão e tente novamente.");
            console.error(error);
        })
        .finally(() => {
            submitBtn.innerText = "Enviar Solicitação de Orçamento";
            submitBtn.disabled = false;
        });
    });
}