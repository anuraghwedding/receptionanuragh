const petals = [
    "./public/images/petals/petal1.webp",
    "./public/images/petals/petal2.webp",
    "./public/images/petals/petal3.webp"
];

function initializePetals(){

    const container = document.getElementById("petals-container");

    setInterval(createPetal,1500);

    function createPetal(){

        const img = document.createElement("img");

        img.className="petal";

        img.src = petals[Math.floor(Math.random()*petals.length)];

        const size = 10 + Math.random()*30;

        img.style.width=size+"px";

        img.style.left=Math.random()*window.innerWidth+"px";

        container.appendChild(img);

        const duration = 8 + Math.random()*5;

        const rotate = 720 + Math.random()*720;

        const drift = (Math.random()-0.5)*300;

        img.animate([
            {
                transform:`translate(0px,-80px) rotate(0deg)`
            },
            {
                transform:`translate(${drift}px,${window.innerHeight+100}px) rotate(${rotate}deg)`
            }
        ],{
            duration:duration*1000,
            easing:"linear"
        });

        setTimeout(()=>{
            img.remove();
        },duration*1000);

    }

}