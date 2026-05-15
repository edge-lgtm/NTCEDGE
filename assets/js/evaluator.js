/**
 * Evaluator Module - State Management and Mock Data
 */

// --- Constants & Color System ---
const colors = {
    primary: '#2D0C8A',
    lightPrimary: '#E9E3FF',
    secondary: '#FFFFFF',
    default: '#565962',
    lightDefault: '#EFF0F6',
    lighterDefault: '#F7F7F7',
    success: '#31A24C',
    lightSuccess: '#EAF9DF',
    error: '#E53935',
    lightError: '#FFEBEE',
    warning: '#FFB020',
    disabled: '#D1D1D1',
    info: '#3BA4F7',
    lightInfo: '#DBEAFE',
    border: '#D9DCE3',
    darkText: '#1E1E1E',
    mutedText: '#6B7280'
};

// --- Mock Data ---
const mockBulkApplications = [
    {
        id: 'BA-2024-001',
        referenceNumber: 'BULK-NTC-2024-001',
        title: 'Radio Station Licenses - Batch A',
        applicantsCount: 50,
        status: 'Pending',
        createdAt: '2024-11-20',
        category: 'Permits and Licenses'
    },
    {
        id: 'BA-2024-002',
        referenceNumber: 'BULK-NTC-2024-002',
        title: 'Equipment Registration - Q4 Batch',
        applicantsCount: 25,
        status: 'Pending',
        createdAt: '2024-11-21',
        category: 'Equipment Registration'
    },
    {
        id: 'BA-2024-003',
        referenceNumber: 'BULK-NTC-2024-003',
        title: 'Operator Certificates Renewal',
        applicantsCount: 120,
        status: 'History',
        createdAt: '2024-11-15',
        category: 'Certificates'
    }
];

const mockApplicantsData = {
    'BA-2024-001': Array.from({ length: 50 }, (_, i) => ({
        id: `APP-001-${i + 1}`,
        name: `Applicant Name ${i + 1}`,
        email: `applicant${i + 1}@example.com`,
        status: 'Pending Evaluation',
        submissionDate: '2024-11-20'
    })),
    'BA-2024-002': Array.from({ length: 25 }, (_, i) => ({
        id: `APP-002-${i + 1}`,
        name: `Tech Corp ${i + 1}`,
        email: `contact${i + 1}@techcorp.com`,
        status: 'Pending Evaluation',
        submissionDate: '2024-11-21'
    }))
};

// --- Utilities ---
function escapeHTML(str) {
    if (!str) return '';
    const p = document.createElement('p');
    p.textContent = str;
    return p.innerHTML;
}

function formatCurrency(val) {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(val);
}

function numberToWords(num) {
    if (num === 0) return 'Zero Pesos Only';

    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

    function convertGroup(n) {
        let res = '';
        if (n >= 100) {
            res += ones[Math.floor(n / 100)] + ' Hundred ';
            n %= 100;
        }
        if (n >= 10 && n <= 19) {
            res += teens[n - 10];
        } else {
            res += tens[Math.floor(n / 10)];
            if (n % 10 > 0) {
                if (Math.floor(n / 10) > 0) res += '-';
                res += ones[n % 10];
            }
        }
        return res;
    }

    let result = '';
    const million = Math.floor(num / 1000000);
    const thousand = Math.floor((num % 1000000) / 1000);
    const rest = Math.floor(num % 1000);

    if (million > 0) {
        result += convertGroup(million) + ' Million ';
    }
    if (thousand > 0) {
        result += convertGroup(thousand) + ' Thousand ';
    }
    if (rest > 0) {
        result += convertGroup(rest);
    }

    return result.trim() + ' Pesos Only';
}

// --- State ---
let state = {
    activeApplication: null,
    activeTab: 'bulk-application',
    applicants: [],
    selectedApplicantIds: new Set(),
    stagedDecisions: {},
    soaSummary: {
        licenseFee: 500,
        inspectionFee: 200,
        stampTax: 30,
        surcharge: 50,
        total: 0,
        dueDate: null
    },
    feedTab: 'pending',
    searchQuery: '',
    currentPage: 1,
    pageSize: 10
};

// --- State Management ---
function updateState(newState) {
    state = { ...state, ...newState };
    // Always recalculate SOA if anything relevant changed
    recalculateSOA();
    render();
}

// --- Logic & Actions ---

function selectApplication(app) {
    const applicants = mockApplicantsData[app.id] || [];
    updateState({
        activeApplication: app,
        applicants: applicants,
        selectedApplicantIds: new Set(),
        stagedDecisions: {},
        activeTab: 'bulk-application',
        currentPage: 1
    });
}

function handleSearch(query) {
    updateState({ searchQuery: query.toLowerCase(), currentPage: 1 });
}

function handleFeedTabChange(tab) {
    updateState({ feedTab: tab, activeApplication: null });
}

function toggleApplicantSelection(id) {
    const newSelected = new Set(state.selectedApplicantIds);
    if (newSelected.has(id)) {
        newSelected.delete(id);
    } else {
        newSelected.add(id);
    }
    updateState({ selectedApplicantIds: newSelected });
}

function toggleSelectAll(checked) {
    if (checked) {
        updateState({ selectedApplicantIds: new Set(state.applicants.map(a => a.id)) });
    } else {
        updateState({ selectedApplicantIds: new Set() });
    }
}

function stageDecision(decision) {
    const newStaged = { ...state.stagedDecisions };
    state.selectedApplicantIds.forEach(id => {
        newStaged[id] = decision;
    });
    updateState({ stagedDecisions: newStaged });
}

function recalculateSOA() {
    const count = state.selectedApplicantIds.size;
    const s = state.soaSummary;
    const licenseFeeTotal = count * s.licenseFee;
    const inspectionFeeTotal = count * s.inspectionFee;
    const stampTaxTotal = count * s.stampTax;
    const surchargeTotal = count > 0 ? s.surcharge : 0;
    const total = licenseFeeTotal + inspectionFeeTotal + stampTaxTotal + surchargeTotal;

    state.soaSummary.total = total;
}

function finalizeSubmission() {
    state.applicants = state.applicants.map(a => {
        if (state.stagedDecisions[a.id]) {
            return { ...a, status: state.stagedDecisions[a.id].toUpperCase() };
        }
        return a;
    });

    updateState({
        stagedDecisions: {},
        selectedApplicantIds: new Set()
    });

    closeModal('confirm-modal');
    showModal('success-modal');
}

function showModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'flex';
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'none';
}

window.closeModal = closeModal;

// --- Render Functions ---

function renderFeed() {
    const feedList = document.getElementById('feed-list');
    if (!feedList) return;

    const filteredApps = mockBulkApplications.filter(app => {
        const matchesTab = app.status.toLowerCase() === state.feedTab;
        const matchesSearch = app.title.toLowerCase().includes(state.searchQuery) ||
                              app.referenceNumber.toLowerCase().includes(state.searchQuery);
        return matchesTab && matchesSearch;
    });

    feedList.innerHTML = filteredApps.map(app => `
        <div class="feed-card ${state.activeApplication?.id === app.id ? 'active' : ''}" onclick="selectApplicationById('${escapeHTML(app.id)}')">
            <div class="card-category">${escapeHTML(app.category)}</div>
            <div class="card-title">${escapeHTML(app.title)}</div>
            <div class="card-footer">
                <span>${escapeHTML(app.referenceNumber)}</span>
                <span>${app.applicantsCount} applicants</span>
            </div>
        </div>
    `).join('');
}

window.selectApplicationById = (id) => {
    const app = mockBulkApplications.find(a => a.id === id);
    if (app) selectApplication(app);
};

window.toggleSelection = (id) => {
    toggleApplicantSelection(id);
};

window.viewApplicantDetails = (id) => {
    const applicant = state.applicants.find(a => a.id === id);
    if (applicant) {
        document.getElementById('detail-name').textContent = applicant.name;
        document.getElementById('detail-email').textContent = applicant.email;
        document.getElementById('detail-status').textContent = applicant.status;
        document.getElementById('detail-id').textContent = applicant.id;
        showModal('details-modal');
    }
};

function renderMainContent() {
    const emptyState = document.getElementById('empty-state');
    const appView = document.getElementById('application-view');

    if (!state.activeApplication) {
        emptyState.style.display = 'flex';
        appView.style.display = 'none';
        return;
    }

    emptyState.style.display = 'none';
    appView.style.display = 'flex';

    document.getElementById('active-app-title').textContent = state.activeApplication.title;
    document.getElementById('active-app-ref').textContent = state.activeApplication.referenceNumber;
    document.getElementById('active-app-count').textContent = `${state.activeApplication.applicantsCount} Applicants`;

    document.querySelectorAll('.view-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === state.activeTab);
    });

    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = content.id === `${state.activeTab}-tab` ? 'flex' : 'none';
    });

    if (state.activeTab === 'bulk-application') {
        renderApplicantsTable();
    } else if (state.activeTab === 'soa') {
        renderSOA();
    }
}

function renderApplicantsTable() {
    const applicantsList = document.getElementById('applicants-list');
    const selectAll = document.getElementById('select-all');

    const startIndex = (state.currentPage - 1) * state.pageSize;
    const paginatedApplicants = state.applicants.slice(startIndex, startIndex + state.pageSize);

    const allSelectedOnPage = paginatedApplicants.length > 0 && paginatedApplicants.every(a => state.selectedApplicantIds.has(a.id));
    selectAll.checked = allSelectedOnPage;

    applicantsList.innerHTML = paginatedApplicants.map(applicant => {
        const isSelected = state.selectedApplicantIds.has(applicant.id);
        const stagedDecision = state.stagedDecisions[applicant.id];
        const statusClass = stagedDecision ? 'status-' + stagedDecision : 'status-' + applicant.status.toLowerCase().replace(/\s+/g, '-');

        return `
            <tr class="${isSelected ? 'selected' : ''}">
                <td><input type="checkbox" ${isSelected ? 'checked' : ''} onclick="event.stopPropagation(); toggleSelection('${escapeHTML(applicant.id)}')"></td>
                <td>
                    <div style="font-weight:600; color:var(--dark-text)">${escapeHTML(applicant.name)}</div>
                    <div style="font-size:0.8rem; color:var(--muted-text)">${escapeHTML(applicant.email)}</div>
                </td>
                <td>
                    <span class="status-text ${statusClass}">
                        ${stagedDecision ? stagedDecision.toUpperCase() : escapeHTML(applicant.status)}
                    </span>
                </td>
                <td>
                    <button class="btn-text" onclick="viewApplicantDetails('${escapeHTML(applicant.id)}')">View Details</button>
                </td>
            </tr>
        `;
    }).join('');

    const totalPages = Math.ceil(state.applicants.length / state.pageSize);
    document.getElementById('page-info').textContent = `Page ${state.currentPage} of ${totalPages}`;
    document.getElementById('prev-page').disabled = state.currentPage === 1;
    document.getElementById('next-page').disabled = state.currentPage === totalPages;

    const helper = document.getElementById('selection-helper');
    const countDisplay = document.getElementById('selected-count');

    if (state.selectedApplicantIds.size > 0) {
        helper.style.display = 'block';
        countDisplay.textContent = state.selectedApplicantIds.size;
    } else {
        helper.style.display = 'none';
        countDisplay.textContent = '0';
    }

    const counts = { approved: 0, endorsed: 0, declined: 0 };
    Object.values(state.stagedDecisions).forEach(d => {
        counts[d]++;
    });

    document.getElementById('count-approve').textContent = counts.approved > 0 ? `(${counts.approved})` : '';
    document.getElementById('count-endorse').textContent = counts.endorsed > 0 ? `(${counts.endorsed})` : '';
    document.getElementById('count-decline').textContent = counts.declined > 0 ? `(${counts.declined})` : '';

    const hasStaged = Object.keys(state.stagedDecisions).length > 0;
    document.getElementById('btn-confirm').disabled = !hasStaged;
}

function renderSOA() {
    const s = state.soaSummary;
    const count = state.selectedApplicantIds.size;

    document.getElementById('soa-license-fee-input').value = s.licenseFee;
    document.getElementById('soa-inspection-fee-input').value = s.inspectionFee;
    document.getElementById('soa-stamp-tax-input').value = s.stampTax;
    document.getElementById('soa-surcharge-input').value = s.surcharge;

    document.getElementById('soa-license-fee-total').textContent = formatCurrency(s.licenseFee * count);
    document.getElementById('soa-inspection-fee-total').textContent = formatCurrency(s.inspectionFee * count);
    document.getElementById('soa-stamp-tax-total').textContent = formatCurrency(s.stampTax * count);
    document.getElementById('soa-surcharge-total').textContent = formatCurrency(count > 0 ? s.surcharge : 0);

    document.getElementById('soa-total').textContent = formatCurrency(s.total);
    document.getElementById('soa-total-words').textContent = numberToWords(s.total);

    const dueDateInput = document.getElementById('soa-due-date');
    const dueDateDisplay = document.getElementById('soa-due-date-display');

    if (s.dueDate) {
        dueDateInput.value = s.dueDate;
        dueDateDisplay.style.display = 'none';
    } else {
        dueDateDisplay.style.display = 'block';
    }
}

function render() {
    renderFeed();
    renderMainContent();
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('feed-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
    }

    const feedTabs = document.querySelectorAll('.feed-tab');
    feedTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            feedTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            handleFeedTabChange(tab.dataset.tab);
        });
    });

    const viewTabs = document.querySelectorAll('.view-tab');
    viewTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            updateState({ activeTab: tab.dataset.tab });
        });
    });

    const selectAll = document.getElementById('select-all');
    if (selectAll) {
        selectAll.addEventListener('change', (e) => toggleSelectAll(e.target.checked));
    }

    document.getElementById('btn-approve').addEventListener('click', () => stageDecision('approved'));
    document.getElementById('btn-endorse').addEventListener('click', () => stageDecision('endorsed'));
    document.getElementById('btn-decline').addEventListener('click', () => stageDecision('declined'));

    const dueDateInput = document.getElementById('soa-due-date');
    if (dueDateInput) {
        dueDateInput.addEventListener('change', (e) => {
            updateState({ soaSummary: { ...state.soaSummary, dueDate: e.target.value } });
        });
    }

    document.getElementById('btn-confirm').addEventListener('click', () => showModal('confirm-modal'));
    document.getElementById('final-submit').addEventListener('click', finalizeSubmission);

    document.getElementById('prev-page').addEventListener('click', () => {
        if (state.currentPage > 1) updateState({ currentPage: state.currentPage - 1 });
    });
    document.getElementById('next-page').addEventListener('click', () => {
        const totalPages = Math.ceil(state.applicants.length / state.pageSize);
        if (state.currentPage < totalPages) updateState({ currentPage: state.currentPage + 1 });
    });

    ['license-fee', 'inspection-fee', 'stamp-tax', 'surcharge'].forEach(field => {
        const input = document.getElementById(`soa-${field}-input`);
        input.addEventListener('input', (e) => {
            const camelKey = field.split('-').map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)).join('');
            const val = parseFloat(e.target.value) || 0;
            const newSoa = { ...state.soaSummary };
            newSoa[camelKey] = val;
            updateState({ soaSummary: newSoa });
        });
    });

    render();
});
