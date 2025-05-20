// Module pour la gestion des étiquettes du tableau croisé dynamique
const PivotLabels = (function() {
    // Fonction pour ajouter les étiquettes au tableau croisé dynamique
    function addPivotTableLabels() {
        // 1. Ajouter l'étiquette "Valeur Σ" à côté de la SECONDE liste déroulante (celle du bas)
        // Recherchons spécifiquement la seconde liste déroulante dans la cellule pvtVals
        const pvtValsCell = document.querySelector('.pvtVals.pvtUiCell');
        if (pvtValsCell) {
            // Rechercher tous les éléments select dans cette cellule
            const selects = pvtValsCell.querySelectorAll('select');
            
            // Si nous avons au moins 2 selects, nous ciblons le second
            if (selects.length >= 2) {
                const secondSelect = selects[1]; // Le deuxième select (index 1)
                
                // Vérifier si l'étiquette n'existe pas déjà
                if (!document.getElementById('sum-value-label')) {
                    const sumLabel = document.createElement('span');
                    sumLabel.id = 'sum-value-label';
                    sumLabel.textContent = 'Valeur Σ';
                    sumLabel.style.fontWeight = '600';
                    sumLabel.style.marginRight = '8px';
                    sumLabel.style.color = 'var(--primary-color)';
                    sumLabel.style.display = 'inline-block';
                    sumLabel.style.verticalAlign = 'middle';
                    
                    // Insérer l'étiquette avant la seconde liste déroulante
                    secondSelect.parentNode.insertBefore(sumLabel, secondSelect);
                }
            } 
            // Si nous n'avons qu'une seule liste déroulante chercher la seconde 
            else if (selects.length === 1) {
                // Chercher si un élément br précède ce select (indiquant qu'il pourrait être le second)
                const br = pvtValsCell.querySelector('br');
                if (br) {
                    // Trouver le select qui suit le br
                    let nextElement = br.nextElementSibling;
                    while (nextElement && nextElement.tagName !== 'SELECT') {
                        nextElement = nextElement.nextElementSibling;
                    }
                    
                    if (nextElement && nextElement.tagName === 'SELECT' && !document.getElementById('sum-value-label')) {
                        const sumLabel = document.createElement('span');
                        sumLabel.id = 'sum-value-label';
                        sumLabel.textContent = 'Valeur Σ';
                        sumLabel.style.fontWeight = '600';
                        sumLabel.style.marginRight = '8px';
                        sumLabel.style.color = 'var(--primary-color)';
                        sumLabel.style.display = 'inline-block';
                        sumLabel.style.verticalAlign = 'middle';
                        
                        // Insérer l'étiquette avant ce select
                        nextElement.parentNode.insertBefore(sumLabel, nextElement);
                    }
                }
            }
        }
        
        // 2. Ajouter l'étiquette "Lignes" au-dessus de la zone de rangées, centrée
        const rowsContainer = document.querySelector('.pvtRows');
        if (rowsContainer && !document.getElementById('rows-label')) {
            // Supprimer l'étiquette existante si elle existe
            const existingLabel = document.getElementById('rows-label');
            if (existingLabel) {
                existingLabel.remove();
            }
            
            const rowsLabel = document.createElement('div');
            rowsLabel.id = 'rows-label';
            rowsLabel.textContent = 'Lignes';
            rowsLabel.style.fontWeight = '600';
            rowsLabel.style.color = 'var(--primary-color)';
            rowsLabel.style.padding = '5px 0';
            rowsLabel.style.textAlign = 'center'; // Centré
            rowsLabel.style.fontSize = '14px';
            rowsLabel.style.marginBottom = '5px';
            rowsLabel.style.pointerEvents = 'none'; // Pour ne pas interférer avec le glisser-déposer
            rowsLabel.style.position = 'absolute'; // Position absolue
            rowsLabel.style.width = '100%'; // Largeur complète pour le centrage
            rowsLabel.style.top = '5px'; // Un peu d'espace en haut
            rowsLabel.style.left = '0'; // Aligné à gauche du conteneur
            
            // Assurons-nous que le conteneur a une position relative pour le positionnement absolu
            if (getComputedStyle(rowsContainer).position === 'static') {
                rowsContainer.style.position = 'relative';
            }
            
            // Ajouter un peu d'espace au-dessus du premier élément
            rowsContainer.style.paddingTop = '30px';
            
            // Insérer l'étiquette au début du conteneur des lignes
            rowsContainer.insertBefore(rowsLabel, rowsContainer.firstChild);
        }
        
        // 3. Ajouter l'étiquette "Colonne" avec un espace réservé stable
        // D'abord, ajoutons un style global pour réserver l'espace
        if (!document.getElementById('cols-space-reservation-style')) {
            const colsSpaceStyle = document.createElement('style');
            colsSpaceStyle.id = 'cols-space-reservation-style';
            colsSpaceStyle.textContent = `
                /* Réserver un espace pour l'étiquette Colonne */
                .pvtCols {
                    position: relative !important;
                    padding-top: 25px !important; /* Espace pour l'étiquette */
                }
                
                /* Assurer la compatibilité avec le mode plein écran */
                #fullscreen-table-container .pvtCols {
                    padding-top: 25px !important;
                }
            `;
            document.head.appendChild(colsSpaceStyle);
        }
        
        const colsContainer = document.querySelector('.pvtCols');
        if (colsContainer && !document.getElementById('cols-label')) {
            // Supprimer l'étiquette existante si elle existe
            const existingLabel = document.getElementById('cols-label');
            if (existingLabel) {
                existingLabel.remove();
            }
            
            const colsLabel = document.createElement('div');
            colsLabel.id = 'cols-label';
            colsLabel.textContent = 'Colonnes';
            colsLabel.style.fontWeight = '600';
            colsLabel.style.color = 'var(--primary-color)';
            colsLabel.style.padding = '3px 8px';
            colsLabel.style.fontSize = '14px';
            colsLabel.style.pointerEvents = 'none'; // Pour ne pas interférer avec le glisser-déposer
            colsLabel.style.position = 'absolute'; // Position absolue
            colsLabel.style.left = '10px'; // Légèrement décalé de la gauche
            colsLabel.style.top = '3px'; // En haut de la zone réservée
            colsLabel.style.zIndex = '5'; // S'assurer qu'il est au-dessus des autres éléments
            
            // Insérer l'étiquette au début du conteneur des colonnes
            colsContainer.insertBefore(colsLabel, colsContainer.firstChild);
        }
        
        // Ajouter des styles pour le mode sombre si pas déjà présents
        if (!document.getElementById('pivot-labels-dark-mode-styles')) {
            const darkModeStyles = document.createElement('style');
            darkModeStyles.id = 'pivot-labels-dark-mode-styles';
            darkModeStyles.textContent = `
                @media (prefers-color-scheme: dark) {
                    #sum-value-label, #rows-label, #cols-label {
                        color: var(--primary-light) !important;
                    }
                }
            `;
            document.head.appendChild(darkModeStyles);
        }
    }

    // Observer les changements dans le DOM pour ajouter les étiquettes quand nécessaire
    function setupLabelsObserver() {
        // Créer un observateur qui surveille les modifications du DOM
        const observer = new MutationObserver((mutations) => {
            // Pour chaque mutation, vérifier l'ajout de nouveaux nœuds
            let shouldAddLabels = false;
            
            for (const mutation of mutations) {
                if (mutation.addedNodes.length) {
                    // Vérifier si les éléments de structure du pivot sont présents
                    const pivotUI = document.querySelector('.pvtUi');
                    if (pivotUI) {
                        shouldAddLabels = true;
                        break;
                    }
                }
                
                // Vérifier également si l'une des étiquettes a été supprimée accidentellement
                if (mutation.removedNodes.length) {
                    if ((!document.getElementById('cols-label') && document.querySelector('.pvtCols')) ||
                        (!document.getElementById('rows-label') && document.querySelector('.pvtRows')) ||
                        (!document.getElementById('sum-value-label') && document.querySelector('.pvtVals'))) {
                        shouldAddLabels = true;
                        break;
                    }
                }
            }
            
            if (shouldAddLabels) {
                // Appliquer les étiquettes avec un court délai pour s'assurer que le DOM est stable
                setTimeout(addPivotTableLabels, 100);
            }
        });
        
        // Observer les deux conteneurs (normal et plein écran)
        const containers = ['table', 'fullscreen-table-container'];
        
        containers.forEach(containerId => {
            const container = document.getElementById(containerId);
            if (container) {
                observer.observe(container, {
                    childList: true,
                    subtree: true
                });
            }
        });
    }

    // Fonction pour réagir aux interactions qui pourraient modifier le tableau
    function setupInteractionListeners() {
        // 1. Lors du changement de vue
        const viewModeSelect = document.getElementById('view-mode-select');
        if (viewModeSelect) {
            viewModeSelect.addEventListener('change', () => {
                setTimeout(addPivotTableLabels, 200);
            });
        }
        
        // 2. Lors de la sortie du mode plein écran
        const fullscreenExitButton = document.getElementById('fullscreen-exit-button');
        if (fullscreenExitButton) {
            fullscreenExitButton.addEventListener('click', () => {
                setTimeout(addPivotTableLabels, 200);
            });
        }
        
        // 3. Surveiller les interactions de glisser-déposer avec une approche plus robuste
        document.addEventListener('mouseup', (event) => {
            // Après un glisser-déposer, vérifier si les étiquettes sont toujours présentes
            setTimeout(() => {
                const needsUpdate = (!document.getElementById('cols-label') && document.querySelector('.pvtCols')) ||
                                  (!document.getElementById('rows-label') && document.querySelector('.pvtRows')) ||
                                  (!document.getElementById('sum-value-label') && document.querySelector('.pvtVals select:nth-child(2)'));
                
                if (needsUpdate) {
                    addPivotTableLabels();
                }
            }, 200);
        });
        
        // 4. Observer les modifications de style en direct
        const styleObserver = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    // Si le style d'un conteneur change, vérifier si les étiquettes sont correctement positionnées
                    setTimeout(addPivotTableLabels, 100);
                    break;
                }
            }
        });
        
        // Observer les conteneurs principaux pour les changements de style
        const containers = ['.pvtCols', '.pvtRows', '.pvtVals'];
        containers.forEach(selector => {
            const container = document.querySelector(selector);
            if (container) {
                styleObserver.observe(container, { attributes: true, attributeFilter: ['style'] });
            }
        });
    }

    // Fonction d'initialisation principale
    function initializePivotTableLabels() {
        // Essayer d'ajouter les étiquettes immédiatement
        addPivotTableLabels();
        
        // Configurer l'observateur pour les changements futurs
        setupLabelsObserver();
        
        // Configurer les écouteurs d'événements
        setupInteractionListeners();
        
        // Vérifier à nouveau après un court délai pour s'assurer que tout est bien en place
        setTimeout(addPivotTableLabels, 500);
        setTimeout(addPivotTableLabels, 1000); // Double vérification après un délai plus long
    }

    // Interface publique du module
    return {
        init: initializePivotTableLabels,
        addLabels: addPivotTableLabels
    };
})();

// Export pour compatibility
function addValueSumLabel() {
    PivotLabels.addLabels();
}
