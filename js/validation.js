//disables the submit button at beginning
(()=>{ document.querySelector('#submitButton').disabled = true;})();

document.querySelector('form').addEventListener('input', e=>{
    let fieldId = e.target.id;
    e.stopPropagation();
    switch(fieldId)
    {
        case 'name':
            nameValidator(e.target);
            break;
        case 'id':
            idValidator(e.target);
            break;
        case 'session':
                sessionValidator(e.target);
                break;
        case 'dept':
                deptValidator(e.target);
                break;
        case 'type':
                typeValidator(e.target);
                break;
        case 'checkbox':
                checkboxValidator(e);
                break;
        
    }

    requirementCheck();
});

//checks if the required fields are empty
function requirementCheck()
{
    let requiredFields = ['name', 'id', 'dept'];
    let submitButton = document.querySelector('#submitButton');
    let amount = Number(document.querySelector('#amount').value);
    let checkboxState = document.querySelector('#checkbox').checked;
    let checkResult =  requiredFields.every((field)=>{
        // console.log(`#${field}`, document.querySelector(`#${field}`).value !== "");
       return document.querySelector(`#${field}`).value !== "" 
            && !document.querySelector(`#${field}`).classList.contains('is-danger');
    });

    // console.log(amount.value);
   if (checkResult == true && amount !== 0 && checkboxState == true)
   {
        submitButton.disabled = false;  
   }
   else if (checkResult == false || amount == 0 || checkboxState == false)
   {
        submitButton.disabled = true;
        if(checkboxState==false)
        {
            document.querySelector('.checkbox').style.color = "red";
        }
        
        if(amount==0)
        {
            document.querySelector('.select').classList.add('is-danger');
        }
        requiredFields.forEach((field)=>{
            if (!document.querySelector(`#${field}`).classList.contains('is-primary'))
            {
                isDanger(field);
            }
        })
   }
}

function isPrimary(id)
{
    let target = document.querySelector(`#${id}`);
    if(target.classList.contains('is-danger'))
        {
            target.classList.remove('is-danger');
        }
    target.classList.add('is-primary');
}

function isDanger(id)
{
    let target = document.querySelector(`#${id}`);
    if(target.classList.contains('is-primary'))
        {
            target.classList.remove('is-primary');
        }
    target.classList.add('is-danger');
}

//regex checker for input type fields
function regExValidatorForTextOnly(id, regEx, value)
{
    // console.log(id);
    // console.log(regEx);
    // console.log(value);
    if(regEx.test(value))
    {
        isPrimary(id);
    }
    else
    {
        isDanger(id);
    }
    requirementCheck();
}

function nameValidator(target)
{
    let regEx = /^[A-Z][A-Za-z\s]{3,32}/;
    regExValidatorForTextOnly(target.id, regEx, target.value);
}

function idValidator(target)
{
    let regEx = /^[0-9]{8}$/;
    regExValidatorForTextOnly(target.id, regEx, target.value);
}

function sessionValidator(target)
{
    let regEx = /^202[0-9]-202[0-9]$/;
    regExValidatorForTextOnly(target.id, regEx, target.value);
    if(regEx.test(target.value))
    {
        let value = target.value;
        let sessionList = value.split('-');
        if(sessionList[1]-sessionList[0] <= 0 || sessionList[1]-sessionList[0]>1)
        {
            isDanger(target.id);
        }
        else
        {
            isPrimary(target.id);
        }
    }
}

function deptValidator(target)
{
    let regEx = /^[A-Z][A-Za-z\s]{2,32}$/;

    regExValidatorForTextOnly(target.id, regEx, target.value);
}

function typeValidator(target)
{
    console.log(target.id);
    console.log(target.selectedIndex);
    console.log(target[target.selectedIndex].value);

    let classOfSelect = document.querySelector('.select');
    document.querySelector('#amount').value = target[target.selectedIndex].value;
    if(target.selectedIndex == 0)
    {
        if(classOfSelect.classList.contains('is-primary'))
        {
            classOfSelect.classList.remove('is-primary');
        }
        classOfSelect.classList.add('is-danger');
    }
    else if (target.selectedIndex == 1 || target.selectedIndex == 2)
    {
        
        if(classOfSelect.classList.contains('is-danger'))
        {
            classOfSelect.classList.remove('is-danger');
        }
        classOfSelect.classList.add('is-primary');
    }

    requirementCheck();
}

function checkboxValidator(event)
{
    // let id = event.target.id;
    console.log(event.target.checked);
    if (event.target.checked == true);
    {
        document.querySelector('.checkbox').style.color = "initial";
    }
 
}