# Hooks

const [value, setvalue] = useState(default) 
    -> Kun øverst i component-funksjonen. 
    -> Hvis man skal bruke forrige verdi for å sette ny verdi, må man 

useEffect(func, [liste av verdier som trigger funksjonen ved endring])
    -> Kode som skal kjøre ved endringer av verdier. Altså noe som ikke skal nødvendigvis kjøre hver gang en komponent re-renderer.
    -> Hvis func inneholder en return (med en func) , vil denne kjøres som en "cleanup" før neste gang verdien endres. Denne vil også kjøres når komponenten unmounter  
