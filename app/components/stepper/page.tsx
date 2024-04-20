import StepperField from "@/components/Stepper/StepperField"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full mx-auto text-center">
      <StepperField startNum={0} minNum={0} maxNum={10} />
      <pre className="mt-1">
        <code className="text-slate-800 text-xs">
          &lt;StepperField startNum=&#123;0&#125; minNum=&#123;0&#125;
          maxNum=&#123;10&#125; /&gt;
        </code>
      </pre>
      <p className="mt-8" />
      <StepperField startNum={1000} minNum={-99} maxNum={1000} />
      <pre className="mt-1">
        <code className="mt-2 text-slate-800 text-xs">
          &lt;StepperField startNum=&#123;1000&#125; minNum=&#123;99&#125;
          maxNum=&#123;1000&#125; /&gt;
        </code>
      </pre>
      <p className="mt-8" />
      <StepperField
        fieldName="foo"
        startNum={1000}
        minNum={-99}
        maxNum={1000}
      />
      <pre className="mt-1">
        <code className="mt-2 text-slate-800 text-xs">
          &lt;StepperField fieldName=&#123;&#34;M&#34;&#125;
          startNum=&#123;1000&#125; minNum=&#123;99&#125;
          maxNum=&#123;1000&#125; /&gt;
        </code>
      </pre>
    </main>
  )
}
