import React from 'react'

function ArticleDelivery() {

    const handleSave = async (event) => {

    }
  return (
    <div>
        <h1>Entrega de bien</h1>
        <form onSubmit={handleSave}>
        <div>
            <label htmlFor="">Cantidad</label><br />
            <input type="text" placeholder='Cantidad'/>
            </div>
            <div>
            <label htmlFor="">Fecha de entrega</label><br />
            <input type="date" placeholder='Fecha de entrega'/>
            </div>
            <div>
            <label htmlFor="">Descripcion</label><br />
            <input type="text" placeholder='Descripcion'/>
            </div>
            <div>
            <label htmlFor="">Estatus</label>
            <input type="checkbox" placeholder='Estatus'/>
            </div>
            <div>
            <label htmlFor="">Observaciones</label><br />
            <input type="text" placeholder='Observaciones'/>
            </div>
            <div>
            <label htmlFor="">Tipo</label><br />
            <input type="text" placeholder='Tipo'/>
            </div>
            <div>
            <label htmlFor="">Ubicacion</label><br />
            <input type="text" placeholder='Ubicacion'/>
            </div>
            <div>
            <label htmlFor="">Almacen</label><br />
            <input type="text" placeholder='Almacen'/>
            </div>
            <div>
            <label htmlFor="">No de Inventario</label><br />
            <input type="text" placeholder='No de Inventario'/>
            </div>
            <div>
            <label htmlFor="">Articulo</label><br />
            <input type="text" placeholder='Articulo'/>
            </div>
            <div>
            <label htmlFor="">Entrega: </label><br />
            <input type="number" placeholder='Entrega'/>
            </div>
            <div>
            <label htmlFor="">Recibe: </label><br />
            <input type="number" placeholder='Recibe'/>
            </div>   
            <div>
            <input type="submit" value={"Guardar entrega"}/>
            </div>            
        </form>
    </div>
  )
}

export default ArticleDelivery