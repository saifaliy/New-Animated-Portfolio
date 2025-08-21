import { useGLTF } from '@react-three/drei'

export function MugModel(props) {
  const { nodes, materials } = useGLTF('/mugModel.glb')
  return (
 <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.Aluminium} />
        <mesh geometry={nodes.Object_3.geometry} material={materials.Menu} />
        <mesh geometry={nodes.Object_4.geometry} material={materials.Plastic} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.Plastic_Blk} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.Aluminium_Frame} />
        <mesh geometry={nodes.Object_7.geometry} material={materials.Aluminium_Frame} />
        <mesh geometry={nodes.Object_8.geometry} material={materials.Chrome} />
        <mesh geometry={nodes.Object_9.geometry} material={materials.Chrome} />
        <mesh geometry={nodes.Object_10.geometry} material={materials.Glass} />
      </group>
    </group>
  )
}

useGLTF.preload('/mugModel.glb')
