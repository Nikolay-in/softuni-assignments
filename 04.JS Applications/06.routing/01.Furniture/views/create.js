import { post } from '../controllers/api.js';
import { html } from '../node_modules/lit-html/lit-html.js';

const template = (onSubmit, onBlur) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control" id="new-make" type="text" @blur=${onBlur} name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control" id="new-model" type="text" @blur=${onBlur} name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control" id="new-year" type="number" @blur=${onBlur} name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" @blur=${onBlur} name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" @blur=${onBlur} name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" @blur=${onBlur} name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>`;

export async function createView(ctx) {
    ctx.render(template(onSubmit, onBlur));
    ctx.setNav('create');


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

        const form = e.target;

        const formData = new FormData(form);

        let inputs = Array.from(form.querySelectorAll('input'));
        
        inputs = inputs.filter(el => el.classList.contains('is-invalid'));

        if (inputs.length > 0) {
            return console.log(`Field ${inputs[0].name} is invalid.`);
        }

        const data = Object.fromEntries(formData.entries());
        console.log(data);
        await post('/data/catalog', data)
        form.reset();
        ctx.setNav('dashboard');
        ctx.page.redirect('/');
    }
}