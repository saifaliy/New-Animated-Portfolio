import { useGLTF } from '@react-three/drei'

export function ConsoleModel(props) {
  const { nodes, materials } = useGLTF('/consoleModel.glb')
  return (

 <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_4.geometry} material={materials.material_0} />
      <mesh geometry={nodes.Object_5.geometry} material={materials.material_0} />
      <mesh geometry={nodes.Object_6.geometry} material={materials.material_0} />
      <mesh geometry={nodes.Object_7.geometry} material={materials.material_0} />
      <mesh geometry={nodes.Object_8.geometry} material={materials.material_0} />
    </group>
  )
}

useGLTF.preload('/consoleModel.glb')
