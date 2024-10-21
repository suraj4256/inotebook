import React from 'react'

export default function Alert(props) {
  const capitalize=(word)=>{
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1)
  }
return (
    <div style={{height:'51px', width:'500px', marginLeft:'100px'}}>
      {props.alert &&  <div class={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
    {capitalize(props.alert.type)} : {props.alert.msg}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>}
</div>
 )
}