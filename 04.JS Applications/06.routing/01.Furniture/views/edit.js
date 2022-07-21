import { html } from '../node_modules/lit-html/lit-html.js';
import { get, put } from '../controllers/api.js';


const template = (onSubmit, onBlur, info) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Edit Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control" id="new-make" type="text" name="make" @blur=${onBlur} value=${info.make}>
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control" id="new-model" type="text" name="model" @blur=${onBlur} value=${info.model}>
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control" id="new-year" type="number" name="year" @blur=${onBlur} value=${info.year}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control" id="new-description" type="text" name="description" @blur=${onBlur} value=${info.description}>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control" id="new-price" type="number" name="price" @blur=${onBlur} value=${info.price}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control" id="new-image" type="text" name="img" @blur=${onBlur} value=${info.img}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" value=${info.material}>
                    </div>
                    <input type="submit" class="btn btn-info" value="Edit" />
                </div>
            </div>
        </form>`;

export async function editView(ctx) {

    // Validate fields
    function onBlur(e) {
        const target = e.target;

        function validate(t, flag) {
            if (flag == true) {
                t.classList.remove('is-invalid');
                t.classList.add('is-valid');
            } else {
                t.classList.add('is-invalid');
                t.classList.remove('is-valid');
            }
        }

        if (target.name == 'make' || target.name == 'model') {
            if(target.value.length < 4) {
                validate(target, false)
                console.log('Make and Model must be at least 4 symbols long')
            } else {
                validate(target, true)
            }
        } 

        if (target.name == 'year') {
            if(target.value < 1950 || target.value > 2050) {
                validate(target, false)
                console.log('Year must be between 1950 and 2050')
            } else {
                validate(target, true)
            }
        } 

        if (target.name == 'description') {
            if(target.value.length <= 10) {
                validate(target, false)
                console.log('Description must be more than 10 symbols')
            } else {
                validate(target, true)
            }
        }

        if (target.name == 'price') {
            if(target.value <= 0) {
                validate(target, false)
                console.log('Price must be a positive number')
            } else {
                validate(target, true)
            }
        }

        if (target.name == 'img') {
            if(target.value.length == 0) {
                validate(target, false)
                console.log('Image URL is required')
            } else {
                validate(target, true)
            }
        }

    }
    
    async function onSubmit(e) {
        e.preventDefault();
        
        // Get data
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        // Validation
        let inputs = Array.from(e.target.querySelectorAll('input'));
        inputs = inputs.filter(el => el.classList.contains('is-invalid'));
        if (inputs.length > 0) {
            return console.log(`Field ${inputs[0].name} is invalid.`);
        }

        // Send data
        await put('/data/catalog/' + ctx.params.id, data);
        ctx.setNav('dashboard');
        ctx.page.redirect('/');
    }

    const info = await get('/data/catalog/' + ctx.params.id);
    ctx.render(template(onSubmit, onBlur, info));
}