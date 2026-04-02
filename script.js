fetch('data.json')
  .then(response => response.json())
  .then(data => {
    
    // --- 1. LATEST UPDATES AUTOMATION ---
    const updates = data.updates;
    const homeUpdatesContainer = document.getElementById('home-updates-container');
    if (homeUpdatesContainer) {
        homeUpdatesContainer.innerHTML = updates.slice(0, 3).map(item => `
            <article class="flex flex-col">
                <span class="text-xs font-label uppercase tracking-widest text-secondary mb-3">${item.date}</span>
                <h3 class="text-2xl font-headline mb-4 leading-snug">${item.title}</h3>
                <p class="text-on-surface-variant font-light leading-relaxed text-sm">${item.description}</p>
            </article>
        `).join('');
    }

    const allUpdatesContainer = document.getElementById('all-updates-container');
    if (allUpdatesContainer) {
        allUpdatesContainer.innerHTML = updates.map(item => `
            <article class="grid grid-cols-1 md:grid-cols-12 gap-12 items-start ${item.title.includes('Midterm') ? 'p-12 bg-surface-container-low rounded-lg' : ''}">
                <div class="md:col-span-3">
                    <span class="font-label text-sm tracking-[0.1em] uppercase text-secondary font-semibold">${item.date}</span>
                </div>
                <div class="md:col-span-9 max-w-2xl space-y-6">
                    <h2 class="font-headline text-3xl text-on-surface">${item.title}</h2>
                    <p class="font-body text-on-surface-variant leading-relaxed text-sm">${item.description}</p>
                </div>
            </article>
        `).join('');
    }

    // --- 2. RESEARCH / PUBLICATIONS AUTOMATION ---
    const research = data.research;
    
    // Home Page: Just show the first 2 research items
    const homeResearchContainer = document.getElementById('home-research-container');
    if (homeResearchContainer) {
        homeResearchContainer.innerHTML = research.slice(0, 2).map(item => `
            <article class="group">
                <span class="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-label uppercase tracking-widest rounded-sm mb-4">${item.type}</span>
                <h3 class="text-2xl font-headline mb-4 group-hover:text-secondary transition-colors">${item.title}</h3>
                
                <p class="text-on-surface-variant font-light leading-relaxed mb-6">${item.description}</p>
                <div class="flex flex-wrap items-center gap-6 font-label text-xs uppercase tracking-widest">
                    <div class="flex gap-2">
                        <a class="group flex items-center gap-2 text-secondary font-label uppercase text-xs hover:opacity-80 transition-all" href=${item.doi} target="_blank">[DOI]</a>
                    </div>
                </div>
                <div class="h-[1px] w-12 bg-outline-variant group-hover:w-full transition-all duration-700 opacity-30"></div>
            </article>
        `).join('');
    }

    // Publications Page: Group by Year (Like a Python defaultdict)
    const allPublicationsContainer = document.getElementById('all-publications-container');
    if (allPublicationsContainer) {
        // Group items by year
        const researchByYear = research.reduce((acc, item) => {
            if (!acc[item.year]) acc[item.year] = [];
            acc[item.year].push(item);
            return acc;
        }, {});

        // Sort years descending (e.g., 2024, 2023)
        const sortedYears = Object.keys(researchByYear).sort((a, b) => b - a);

        let publicationsHTML = '';
        sortedYears.forEach(year => {
            const itemsInYear = researchByYear[year].map(item => `
                <article class="group">
                    <div class="flex gap-8">
                        <div class="hidden sm:block w-0.5 bg-secondary-fixed-dim shrink-0"></div>
                        <div>
                            <div class="mb-4">
                                <span class="inline-block bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm mb-3">${item.type}</span>
                                <h3 class="font-headline text-3xl font-bold text-primary group-hover:text-secondary transition-colors leading-tight mb-2">${item.title}</h3>
                                <p class="italic font-headline text-xl text-on-surface-variant mb-4">${item.venue}</p>
                            </div>
                            <p class="font-body text-on-surface/80 leading-relaxed mb-6 max-w-2xl">${item.description}</p>
                            <div class="flex flex-wrap items-center gap-6 font-label text-xs uppercase tracking-widest">
                                <span class="text-on-surface-variant">${item.date}</span>
                                <div class="flex gap-4">
                                    <a class="text-secondary border-b border-secondary/30 hover:border-secondary transition-all pb-0.5" href=${item.doi} target="_blank">[DOI]</a>
                                    <a class="text-secondary border-b border-secondary/30 hover:border-secondary transition-all pb-0.5" href="#" target="_blank">[PDF]</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            `).join(''); // End of items map

            // Wrap the items in their Year container
            publicationsHTML += `
                <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
                    <div class="md:col-span-2">
                        <h2 class="font-headline text-4xl text-outline-variant italic">${year}</h2>
                    </div>
                    <div class="md:col-span-8 space-y-24">
                        ${itemsInYear}
                    </div>
                </div>
            `;
        });
        allPublicationsContainer.innerHTML = publicationsHTML;
    }


    // --- 3. PROJECTS AUTOMATION ---
    const projects = data.projects;

    // Home Page: Simple card layout for top 2
    const homeProjectsContainer = document.getElementById('home-projects-container');
    if (homeProjectsContainer) {
        homeProjectsContainer.innerHTML = projects.slice(0, 2).map(item => `
            <div class="group">
                <div class="aspect-[4/5] overflow-hidden mb-8 bg-surface-container-highest">
                    <img alt="${item.title}" class="w-full h-full object-cover grayscale hover:scale-105 transition-transform duration-1000" src="${item.image}"/>
                </div>
                <h3 class="text-2xl font-headline mb-4">${item.title}</h3>
                <p class="text-on-surface-variant font-light leading-relaxed">${item.description}</p>
            </div>
        `).join('');
    }

    // Projects Page: The Asymmetrical Grid Magic
    const allProjectsContainer = document.getElementById('all-projects-container');
    if (allProjectsContainer) {
        allProjectsContainer.innerHTML = projects.map((item, index) => {
            // Cycle through 4 different layout styles based on the index (0, 1, 2, 3)
            const style = index % 4; 
            
            if (style === 0) {
                // Layout 1: Wide Featured
                return `
                <div class="md:col-span-8 flex flex-col group">
                    <div class="overflow-hidden mb-8 aspect-[16/9] bg-surface-container-low">
                        <img alt="${item.title}" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" src="${item.image}"/>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-8 gap-4">
                        <div class="md:col-span-2">
                            <span class="font-label text-secondary-dim text-[10px] uppercase tracking-widest block mb-2">${item.category}</span>
                            <div class="h-[1px] w-8 bg-outline-variant/30"></div>
                        </div>
                        <div class="md:col-span-6">
                            <h2 class="font-headline text-3xl text-primary mb-4">${item.title}</h2>
                            <p class="font-body text-on-surface-variant text-sm leading-relaxed mb-6 max-w-lg">${item.description}</p>
                        </div>
                    </div>
                </div>`;
            } else if (style === 1) {
                // Layout 2: Text Card Sidebar
                return `
                <div class="md:col-span-4 flex flex-col justify-center">
                    <div class="p-8 lg:p-12 bg-surface-container-low border-l-2 border-secondary/20">
                        <span class="font-label text-secondary-dim text-[10px] uppercase tracking-widest block mb-4">${item.category}</span>
                        <h3 class="font-headline text-2xl text-primary mb-4 italic">${item.title}</h3>
                        <p class="font-body text-on-surface-variant text-xs leading-relaxed mb-6">${item.description}</p>
                        <button class="text-primary font-label text-[10px] uppercase tracking-widest group flex items-center gap-2">
                            View Dossier <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                        </button>
                    </div>
                </div>`;
            } else if (style === 2) {
                // Layout 3: Tall offset
                return `
                <div class="md:col-start-2 md:col-span-5 flex flex-col">
                    <div class="aspect-[4/5] bg-surface-container-low overflow-hidden mb-8">
                        <img alt="${item.title}" class="w-full h-full object-cover" src="${item.image}"/>
                    </div>
                    <div>
                        <h2 class="font-headline text-3xl text-primary mb-4 italic">${item.title}</h2>
                        <p class="font-body text-on-surface-variant text-sm leading-relaxed mb-6">${item.description}</p>
                    </div>
                </div>`;
            } else {
                // Layout 4: Square offset
                return `
                <div class="md:col-span-6 flex flex-col justify-end">
                    <div class="aspect-square bg-surface-container-low overflow-hidden mb-8">
                        <img alt="${item.title}" class="w-full h-full object-cover" src="${item.image}"/>
                    </div>
                    <div class="max-w-md">
                        <h2 class="font-headline text-3xl text-primary mb-4">${item.title}</h2>
                        <p class="font-body text-on-surface-variant text-sm leading-relaxed mb-6">${item.description}</p>
                    </div>
                </div>`;
            }
        }).join('');
    }
  })
  .catch(error => console.error('Error loading data:', error));