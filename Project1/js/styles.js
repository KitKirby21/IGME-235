function parallelogram (number) {
    let wrapper = document.getElementById("parallelograms")
    let parallelograms = ""
    for (let i = 0; i < number; i++) {
        parallelograms += '<div class="parallelogram"></div>';
    }
    wrapper.innerHTML = parallelograms
}

parallelogram(8)