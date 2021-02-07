$(document).ready(function() {
    
// ***LJUST/MÖRKT TEMA***
    
    $("#nattodag").click(function() {
        
        // Togglar olika innehåll (text + bild) i knappen beroende på vilket tema som är aktivt
        $("#dark").toggle();
        $("#light").toggle();
        
        // Togglar en klass som inverterar färgerna i lunchställegenerator-sektionen
        $(".restaurangSlumpare").add(".st0").add(".tillaggsdiv").each(function() {
            $(this).toggleClass("morkttema");
        }); 
    });
    
});    


