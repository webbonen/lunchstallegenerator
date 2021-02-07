$(document).ready(function() {
    
    RefreshSomeEventListener();

//////// Samtliga globala variabler        
        var infodiven = document.getElementById("infodiv");
                                    //var bakgrundsdiv = document.getElementById("bakgrundsdiv");
        var slumpresultat;
        var kortsantalggr = 0;
        var restaurang = [];

        
                                    
///////// Skapa en klass för restauranger
        class Restaurang {
            constructor(name, adress, xposition, yposition, oppettider, cirkelid) {
                this.name = name;
                this.adress = adress;
                this.xposition = xposition;
                this.yposition = yposition;
                this.oppettider = oppettider;
                this.platsiarray = restaurang.length;
                this.nycirkel;
            }
            
            skapacirkel() {
                var ensiffra = this.platsiarray;
                var idnr = "cirkel" + this.platsiarray;
                
                this.nycirkel = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                document.getElementById("soder").appendChild(this.nycirkel);
                this.nycirkel.setAttribute("id", idnr);
                this.nycirkel.setAttribute("class", "st1");
                this.nycirkel.setAttribute("cx", this.xposition);
                this.nycirkel.setAttribute("cy", this.yposition);
                this.nycirkel.setAttribute("r", "11.43");            
                var onclickfarger1 = () => {
                    this.printanamn();
                };
                this.nycirkel.addEventListener("click", onclickfarger1);
                console.log(restaurang[ensiffra]);
            }
            
            skapalistelement() {
                let listpunkt = document.createElement("li");
                document.getElementById("listamedrestauranger").appendChild(listpunkt);
                listpunkt.innerHTML = this.name;
                listpunkt.style.padding = "2.5px";
                listpunkt.addEventListener("mouseover", function() { listpunkt.style.backgroundColor = 'lightgray' });
                listpunkt.addEventListener("mouseout", function() { listpunkt.style.backgroundColor = 'darkgray' }); 
                var onclickfarger2 = () => {
                    this.printanamn();
                };
                listpunkt.addEventListener("click", onclickfarger2);
            }
            
            
            printanamn() {
                visa();
                    if (this.nycirkel.style.fill === "green") {
                        console.log("joråsåatteee");
                        this.nycirkel.style.fill = "green";
                    }
                    else {
                        this.nycirkel.style.fill = "blue";
                    }
                    var innehall1 = "<h2>" + this.name + "</h2>" + this.adress + "<br/> Öppettider: " + this.oppettider;


                  //  infodiven
                        document.getElementById("infotext").innerHTML = innehall1;
                    console.log(this.nycirkel);
                RefreshSomeEventListener();
            }

            
        } // SLUT PÅ CLASS


        
        
////////// En array med restauranger utifrån klassen Restaurang
        restaurang[0]= new Restaurang("La Neta", "Gatuvägen X", 621, 236, "8-22", "cirkel0");
        restaurang[1]= new Restaurang("Bun Meat Bun", "Gatuvägen X", 694, 132, "8-22", "cirkel1");
        restaurang[2]= new Restaurang("Blå dörren", "Gatuvägen X", 483, 107, "8-22", "cirkel2");
        restaurang[3]= new Restaurang("Amidas", "Gatuvägen X", 795, 248, "8-22", "cirkel3");
        restaurang[4]= new Restaurang("Pat\'s place", "Gatuvägen X", 102, 126, "8-22", "cirkel4");
        restaurang[5]= new Restaurang("Bibimbap", "Gatuvägen X", 325, 190, "8-22", "cirkel5");
        restaurang[6]= new Restaurang("McDonalds", "Gatuvägen X", 595, 126, "8-22", "cirkel6");
        
    
        
///////// Funktion som skapar alla startcirklar        
        function skapastartcirklar() {
            for (var i = 0; i < restaurang.length; i++)
            restaurang[i].skapacirkel();
        }

        
        
///// Funktion som skapar alla listelement
        function visaalla() {
            if (kortsantalggr < 1) {   // För att den inte ska lägga till samma punkter flera ggr om man trycker på knappen flera ggr 
            for (let i=0; i < restaurang.length; i++) {
                restaurang[i].skapalistelement();
            }
            kortsantalggr = 1; // Se kommentaren ovan
            }
        }




///// Funktion som visar infodiv       
        function visa() {
            infodiven.style.display = "block";
                            //bakgrundsdiv.style.display = "block";
        }
        
 //// Funktion som färgar alla utom den framslumpade pluppen till gråa igen
        //gömmer infodiv och 
        function resettaallautomen() {
       // alert("osynligfunkar!");
    //        infodiven.style.display = "none";
    //        bakgrundsdiv.style.display = "none";
    //        $("#infodiv").toggle();
    //        $("#bakgrundsdiv").toggle();

            for (let i = 0; i < restaurang.length; i++) {
                if (i != slumpresultat) {
                    restaurang[i].nycirkel.style.fill = "gray";
                }
            }
        }
        
///// Funktion som färgar alla pluppar gråa igen  
        function resettaallt() {
            for (let i = 0; i < restaurang.length; i++) {
                    restaurang[i].nycirkel.style.fill = "gray";
                }
        }


        
///////// Funktion som slumpar fram en random plats i arrayen restaurang
        function slumpa() {    
            for (var i = 0; i< restaurang.length; i++) {
                var slumpplatsiarray = Math.floor(Math.random()*restaurang.length);
                return slumpplatsiarray;
            }
        }
        
 
  

/////////// Funktion som animerar slumpandet
        function flyttaplupp() {            

            /////// Anropar en annan funktion, se nedan, och kör den med ett visst intervall
            var intervall = setInterval(slumpfunktion, 400);
            var i = 0;
            var antalggr = 20;

            ////// Den funktionen anropar slumpfunktionen som ger en siffra och väljer motsvarande restaurangelement
            function slumpfunktion() {
                i++;
                //var
                slumpresultat = slumpa();                               
                var plupp = restaurang[slumpresultat];
                
                
                /////// Om funktionen har körts färre ggr än variabeln antalggr anger:
                if (i < antalggr) {
                     //setTimeout(function() {
                        //// Så körs en annan funktion som efter viss tid gör att ovan nämnda restaurangelements plupp färgas röd
                        setTimeout(function() {
                            plupp.nycirkel.style.fill = "red";
                            console.log(slumpresultat);                                 
                        }, 25);
                        //// Därfefter körs ytterligare en funktion som efter viss tid gör att samma plupp färgas grå igen
                        setTimeout(function() {
                            plupp.nycirkel.style.fill = "gray";
                        }, 100);
                   // }, 1000 * i); 
                } 
                ////// Annars körs en annan funktion som efter en viss tid bl.a.
                else {    
                    setTimeout(function() {
                        console.log("klar! sista slumpen: " + restaurang[slumpresultat].name + " - " + slumpresultat);
                        ///// Gör pluppen något större och färgar den grön
                        plupp.nycirkel.setAttribute("r", "20");
                        plupp.nycirkel.style.fill = "green";
                        ///// Anropar printanamn-funktionen
                        plupp.printanamn(slumpresultat, "ja");
                        ///// Och anropar en annan funktion som efter en viss tid gör pluppen mindre igen
                        setTimeout(function() {
                            plupp.nycirkel.setAttribute("r", "11.43");
                        }, 300);
                        //////// Den avbryter också intervallfunktionen
                        clearInterval(intervall);                      
                    }, 200); // Denna måste vara mindre än 400 för annars hinner den köra flera ggr innan nästa intervall kommer
                }         
            }
        }


/////// Funktion som lägger till ett nytt restaurangobjekt i restaurangarrayen baserat på input från formuläret
/////// Den skapar också en cirkel, samt ett nytt listelement
    function adderatillagdatillrestauranglista() {
        
        document.getElementById("listamedrestauranger").innerHTML = null; /// För att listan ska "uppdateras" vid varje anrop
        var platsiarray = restaurang.length;
        console.log(platsiarray);
        var idnr = "cirkel" + platsiarray;
        var namn = omnollnamn();
        var xposition = omnollpos("xpos");document.getElementById("xpos").value;
        var yposition = omnollpos("ypos");document.getElementById("ypos").value;
        var tillaggtillarray = new Restaurang(namn, "Gatuvägen X", xposition, yposition, "8-22", idnr);
        restaurang.push(tillaggtillarray);
        
        console.log(restaurang[platsiarray]);
        
        restaurang[platsiarray].skapacirkel();
        
        for (var i = 0; i < restaurang.length; i++) {
         restaurang[i].skapalistelement();   
        }
    }
        
    
        
///// Funktion för felhantering (inget namn angett i formuläret)
    function omnollnamn() {
        if (document.getElementById("namn").value.length == 0) {
            return "\[Inget namn\]";
        }
        else {
            return document.getElementById("namn").value;
        }
    }    
        
///// Funktion för felhantering (ingen position angett i formuläret)
    function omnollpos (element) {
                if (document.getElementById(element).value.length == 0) {
            return -100; // gömmer pluppen utanför viewporten
        }
        else {
            return document.getElementById(element).value;
        }
    }   
    // Källa: https://www.w3resource.com/javascript/form/non-empty-field.php        
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
/////////////////////////////////////////// JQUERY /////////////////////////////////////////////////////////    

    
// ***KNAPPFUNKTIONER***    
    
    $("#slumpaknapp").click(function() {
        // Anropar nedanstående funktioner (vad de gör går att läsa där de är deklarerade)
        resettaallt();
        flyttaplupp();
    });
    
    
    $("#visaknapp").click(function() {
        $(this).toggle();
        $("#laggtillflerknapp").fadeToggle();
        $("#listamedrestauranger").fadeToggle();    
    });
    
    
    $("#laggtillflerknapp").click(function() {
        $("#tillaggsdiv").fadeToggle();
        // Ändrar bottom-marginalen på knappen så att kartan flyttas ner och på så sätt behålls synlig hela tiden
        $(this).css("marginBottom", "17rem");
        $("#slumparinnehallsdiv").find("p").fadeToggle();
        //$("#bakgrundsdiv").toggle();
    });
    
    
    $("#laggtillknapp").click(function() {
        //$("#bakgrundsdiv").toggle();
        $("#tillaggsdiv").fadeToggle();
        $("#laggtillflerknapp").css("marginBottom", "2rem"); // ändrar tillbaka marginalen
        $("#slumparinnehallsdiv").find("p").fadeToggle();
        adderatillagdatillrestauranglista();    
    });
    
    $("#avbrytknapp").click(function() {
        //$("#bakgrundsdiv").toggle();
        $("#laggtillflerknapp").css("marginBottom", "2rem"); // ändrar tillbaka marginalen
        $("#slumparinnehallsdiv").find("p").fadeToggle();
        $("#tillaggsdiv").fadeToggle();    
    });
    
    
    // Lägger till felmeddelande till knappar och länkar som inte leder någon vart
    $("nav li").add(".contact").each(function() {
        $(this).click(function() {
            alert("Sorry, finns inget här ännu!");
        });
    });
    
    
    
    
// ***ADDERA EVENTS TILL DYNAMISKT TILLAGD INFODIV***    
    
    //  https://stackoverflow.com/questions/1359018/how-do-i-attach-events-to-dynamic-html-elements-with-jquery

    function RefreshSomeEventListener() {
    // Tar bort eventhandlers från angivna element
        $("#infodiv #stangforfan").off(); 

    // Lägger till önskade eventhandlers på nytt
        $("#infodiv #stangforfan").on("click", function() {
            $("#infodiv").toggle();
            resettaallautomen();
            //$("#bakgrundsdiv").toggle();
        });
    
    }
  
    
    
    

    
// ***PLACERA UT NY RESTAURANG***
    
   $(document).on( "click", function( event ) {

        // Räknar ut skillnaden mellan bodyns och SVG:ns position
        // https://stackoverflow.com/questions/1350581/how-to-get-an-elements-top-position-relative-to-the-browsers-viewport
        var element =  document.querySelector('svg');
        var bodyRect = document.body.getBoundingClientRect();
        var elemRect = element.getBoundingClientRect();
        var offsetvardeY   = elemRect.top - bodyRect.top;
        var offsetvardeX = elemRect.left - bodyRect.left; 



        var viewportX = event.pageX;
        var viewportY = event.pageY;
        console.log(viewportX +"*"+ viewportY );

        // Räknar om ovanstående koordinater till element-bundna värden genom att subtrahera offset-värdena från koordinaternas värden
        // https://www.bennadel.com/blog/3441-translating-viewport-coordinates-into-element-local-coordinates-using-element-getboundingclientrect.htm       
        var xvarde = viewportX - offsetvardeX;
        var yvarde = viewportY - offsetvardeY;

        // Skickar in värdena i inputfälten
        $( "#xpos" ).val(xvarde);
        $( "#ypos" ).val(yvarde);

    });

    
     skapastartcirklar(); visaalla();    
});
        