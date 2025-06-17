import { Scale, ScaleStep } from "@/registry/ui/scale"

export default function Smileys() {
  return (
    <Scale className="mt-3">
      <ScaleStep id="0" name="percent" label="😡 Bad" />
      <ScaleStep id="50" name="percent" label="😐 OK" defaultChecked />
      <ScaleStep id="100" name="percent" label="😊 Good" />
    </Scale>
  )
}
