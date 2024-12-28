let stkVisible = false;
let reviewPage = 1;

function startAnimation(){
    let starters = document.querySelectorAll(".starter");
    starters.forEach((element, idx) => {
        let animationDelay = 350;
        setTimeout(() => {
            element.style.opacity = "1";
            if(idx == 0){ // homeTitle
                element.style.bottom = "0px";
            } else if(idx == 1){ // homePara
                element.style.top = "0px";
            } else if(idx == 2){ // leftBtn
                element.style.right = "0px";
            } else if(idx == 3){ // rightBtn
                element.style.left = "0px";
            } else if(idx == 4){ // label
                element.style.top = "0px";
                element.style.opacity = "0.5";
            } else if(idx == 5){ // clients
                element.style.transition = "1s ease";
                element.style.opacity = "1";
            }
        }, animationDelay * (idx + 1));
    });
}
setTimeout(startAnimation, 150);

// HEADER
window.addEventListener("scroll", () => {
    let fromTop = window.scrollY;
    let stkHeaderContainer = document.querySelector(".stk-header-container");
    if(fromTop > 250 && !stkVisible){
        stkVisible = true;
        stkHeaderContainer.style.top = "0px";
        stkHeaderContainer.style.opacity = "1";
    } else if(fromTop < 250 && stkVisible){
        stkVisible = false;
        stkHeaderContainer.style.top = "-200px";
        stkHeaderContainer.style.opacity = "0";
    }
});

// SWITHCERS (PROJECT IMGS)
setInterval(projectMovement, 1500);function projectMovement(){
    let positionsLeft = [458, 961, 208, 710, 1212];
    document.querySelectorAll(".proj-img").forEach((block) => {
        let random = Math.floor(Math.random() * (positionsLeft.length));
        let selectedLeft = positionsLeft[random];
        let selectedTop;
        if(selectedLeft == 458 || selectedLeft == 961){
            selectedTop = 119;
        } else {
            selectedTop = 461;
        }
        block.style.top = selectedTop + "px";
        block.style.left = selectedLeft + "px";
        positionsLeft = positionsLeft.filter((value) => {
            return value !== selectedLeft;
        });
    });
}

// SCROLL TARGET
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.top = "0px";

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2 // Trigger when 20% of the element is visible
});
const grower = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            if(entry.target == document.querySelector(".how-line")){
                entry.target.style.width = "100%";
            } 
            entry.target.style.transform = "scale(1)";

            observer.unobserve(entry.target);
        }
    });
  }, {
    threshold: 0.25 // Trigger when 10% of the element is visible
});
const visibiliser = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.style.opacity = "1";

            observer.unobserve(entry.target);
        }
    });
  }, {
    threshold: 0.85 // Trigger when 10% of the element is visible
});
document.querySelectorAll(".scroll-grower").forEach(target => {
    grower.observe(target);
});
document.querySelectorAll(".scroll-target").forEach(target => {
    observer.observe(target);
});
document.querySelectorAll(".scroll-opacity").forEach(target => {
    visibiliser.observe(target);
});

// caseBtn hover arrow width effect
document.querySelectorAll(".case-btn").forEach((button, idx) => {
    button.addEventListener("mouseenter", () => {
        document.querySelectorAll(".full-arrow i")[idx].style.fontSize = "22px";
    });
});
document.querySelectorAll(".case-btn").forEach((button, idx) => {
    button.addEventListener("mouseleave", () => {
        document.querySelectorAll(".full-arrow i")[idx].style.fontSize = "0px";
    });
});

//  REVIEWS  //
function moveReviews(direction){
    let leftArrow = document.querySelector(".rev-arrow-left");
    let rightArrow = document.querySelector(".rev-arrow-right");
    let reviewWrappers = document.querySelectorAll(".rev-wrapper");
    let reviewContainer = document.querySelector(".rev-container");
    let pagePositions = ["0px", "875px", "1760px"];
    if(window.innerWidth < 1500){
        pagePositions = ["0px", "900px", "2000px"]
    }

    if(direction == "right"){
        if(reviewPage == 1){
            reviewContainer.classList.remove("left-visible");
            reviewContainer.classList.add("left-blurred");
            leftArrow.style.visibility = "visible";
            reviewWrappers.forEach(wrapper => {wrapper.style.right = pagePositions[1]});
        } else if(reviewPage == 2){
            reviewWrappers.forEach(wrapper => {wrapper.style.right = pagePositions[2]});
            rightArrow.style.visibility = "hidden";
        }

        if(reviewPage == 1 || reviewPage == 2){
            reviewPage++;
        }
    } 

    else if(direction == "left"){
        if(reviewPage == 2){
            reviewContainer.classList.remove("left-blurred");
            reviewContainer.classList.add("left-visible");
            leftArrow.style.visibility = "hidden";
            reviewWrappers.forEach(wrapper => {wrapper.style.right = pagePositions[0]});
        } else if(reviewPage == 3){
            reviewWrappers.forEach(wrapper => {wrapper.style.right = pagePositions[1]});
            rightArrow.style.visibility = "visible";
        }

        if(reviewPage == 2 || reviewPage == 3){
            reviewPage--;
        }
    }
}
let switchReviewInt;
let reviewIdx = 0;
let mReviewWrappers = document.querySelectorAll(".m-rev-wrapper");
let wrapperMovement = "800px";
function switchReviews(){
    switchReviewInt = setInterval(() => {
        let goingWrapper = mReviewWrappers[reviewIdx];
        if(reviewIdx < 6){
            goingWrapper.style.left = "-" + wrapperMovement;
            setTimeout(() => {
                goingWrapper.style.transition = "0s ease";
                goingWrapper.style.left = wrapperMovement;
                goingWrapper.offsetWidth;
                goingWrapper.style.transition = "1s ease";
            }, 1000);
            mReviewWrappers[reviewIdx + 1].style.left = "0px";
            mReviewWrappers.forEach(wrapper => {
                wrapper.querySelectorAll(".m-idx-flex").forEach(flexContainer => {
                    flexContainer.querySelectorAll(".m-rev-idx")[reviewIdx].style.backgroundColor = "hsla(213, 90%, 92%, 0.6)";
                    flexContainer.querySelectorAll(".m-rev-idx")[reviewIdx + 1].style.backgroundColor = "hsla(213, 90%, 75%, 1)";
                })
            });
            reviewIdx++;
        } else {
            goingWrapper.style.left = "-" + wrapperMovement;
            setTimeout(() => {
                goingWrapper.style.transition = "0s ease";
                goingWrapper.style.left = wrapperMovement;
                goingWrapper.offsetWidth;
                goingWrapper.style.transition = "1s ease";
            }, 1000);
            mReviewWrappers[0].style.left = "0px";
            mReviewWrappers.forEach(wrapper => {
                wrapper.querySelectorAll(".m-idx-flex").forEach(flexContainer => {
                    flexContainer.querySelectorAll(".m-rev-idx")[reviewIdx].style.backgroundColor = "hsla(213, 90%, 92%, 0.6)";
                    flexContainer.querySelectorAll(".m-rev-idx")[0].style.backgroundColor = "hsla(213, 90%, 75%, 1)";
                })
            });
            reviewIdx = 0;
        }
    }, 3000);
}
mReviewWrappers.forEach(parent => {
    parent.querySelectorAll(".m-idx-flex").forEach(flexContainer => {
        flexContainer.querySelectorAll(".m-rev-idx").forEach((circle, idx) => {
            if(idx == 0){
                circle.style.backgroundColor = "hsla(213, 90%, 75%, 1)";
            }
            circle.addEventListener("click", () => {
                manualSwitch(idx);
            });
        });
    })
});
function manualSwitch(clickedIdx){if(clickedIdx != reviewIdx){
    clearInterval(switchReviewInt);
    //highlight circle
    mReviewWrappers.forEach(wrapper => {
        wrapper.querySelectorAll(".m-idx-flex").forEach(flexContainer => {
            flexContainer.querySelectorAll(".m-rev-idx").forEach((circle, idx) => {
                if(idx == clickedIdx){
                    circle.style.backgroundColor = "hsla(213, 90%, 75%, 1)";
                } else {
                    circle.style.backgroundColor = "hsla(213, 90%, 92%, 0.6)";
                }
            });
        });
    });

    mReviewWrappers.forEach((wrapper, idx) => {
        if(idx == clickedIdx){ // set up selected wrapper for move-in
            wrapper.style.transition = "0s ease";
            wrapper.style.left = wrapperMovement;
            wrapper.offsetWidth;
            wrapper.style.transition = "1s ease";
            wrapper.style.left = "0px";
        } else if(idx == reviewIdx){ // if current wrapper: slide left, -> reposition.
            wrapper.style.left = "-" + wrapperMovement;
            setTimeout(() => {
                wrapper.style.transition = "0s ease";
                wrapper.style.left = wrapperMovement;
                wrapper.offsetWidth;
                wrapper.style.transition = "1s ease";
            }, 1000);
        } 
    });
    reviewIdx = clickedIdx;
}}
switchReviews();
///////////////
