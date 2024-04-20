import StepperField from "@/components/Stepper/StepperField"

export default function Home() {
  return (
    <main className="flex mt-12 flex-col items-center justify-center w-full mx-auto">
      <div className="flex w-60 justify-center items-center flex-col gap-1 pb-10">
        <StepperField startNum={0} />
        <pre className="mt-1">
          <code className="text-slate-800 text-xs">
            &lt;StepperField
            <br />
            &nbsp;&nbsp;startNum=&#123;0&#125;
            <br />
            /&gt;
          </code>
        </pre>
      </div>
      <div className="flex w-60 justify-center items-center flex-col gap-1 pb-10">
        <StepperField startNum={0} minNum={0} maxNum={10} />
        <pre className="mt-1">
          <code className="text-slate-800 text-xs">
            &lt;StepperField &nbsp;&nbsp;
            <br />
            startNum=&#123;0&#125;
            <br />
            &nbsp;&nbsp;minNum=&#123;0&#125;
            <br />
            &nbsp;&nbsp;maxNum=&#123;10&#125;
            <br />
            /&gt;
          </code>
        </pre>
      </div>
      <div className="flex w-60 justify-center items-center flex-col gap-1 pb-10">
        <StepperField startNum={100} minNum={-99} maxNum={100} />
        <pre className="mt-1">
          <code className="mt-2 text-slate-800 text-xs">
            &lt;StepperField
            <br />
            &nbsp;&nbsp;startNum=&#123;1000&#125;
            <br />
            &nbsp;&nbsp;minNum=&#123;99&#125;
            <br />
            &nbsp;&nbsp;maxNum=&#123;1000&#125;
            <br />
            /&gt;
          </code>
        </pre>
      </div>
      <div className="flex w-60 justify-center items-center flex-col gap-1 pb-10">
        <StepperField
          fieldName="M"
          fieldLabel="M"
          startNum={100}
          minNum={-99}
          maxNum={100}
        />
        <pre className="mt-1">
          <code className="mt-2 text-slate-800 text-xs">
            &lt;StepperField
            <br />
            &nbsp;&nbsp;fieldName=&#123;&#34;M&#34;&#125;
            <br />
            &nbsp;&nbsp;fieldLabel=&#123;&#34;M&#34;&#125;
            <br />
            &nbsp;&nbsp;startNum=&#123;1000&#125;
            <br />
            &nbsp;&nbsp;minNum=&#123;99&#125;
            <br />
            &nbsp;&nbsp;maxNum=&#123;1000&#125;
            <br />
            /&gt;
          </code>
        </pre>
      </div>
      <div className="flex w-60 justify-center items-center flex-col gap-1 pb-10">
        <div className="flex gap-3">
          <StepperField
            collapses={true}
            hideBadgeNum={0}
            fieldName="S"
            fieldLabel="S"
            startNum={0}
            minNum={0}
            maxNum={100}
          />
          <StepperField
            collapses={true}
            hideBadgeNum={0}
            fieldName="M"
            fieldLabel="M"
            startNum={3}
            minNum={0}
            maxNum={100}
          />
          <StepperField
            collapses={true}
            hideBadgeNum={0}
            fieldName="L"
            fieldLabel="L"
            startNum={0}
            minNum={0}
            maxNum={100}
          />
        </div>
        <pre className="mt-1">
          <code className="mt-2 text-slate-800 text-xs">
            3 *
            <br />
            &lt;StepperField
            <br />
            &nbsp;&nbsp;collapses=&#123;&#34;true&#34;&#125;
            <br />
            &nbsp;&nbsp;hideBadgeNum=&#123;&#34;0&#34;&#125;
            <br />
            &nbsp;&nbsp;fieldName=&#123;&#34;M&#34;&#125;
            <br />
            &nbsp;&nbsp;fieldLabel=&#123;&#34;M&#34;&#125;
            <br />
            &nbsp;&nbsp;startNum=&#123;1000&#125;
            <br />
            &nbsp;&nbsp;minNum=&#123;99&#125;
            <br />
            &nbsp;&nbsp;maxNum=&#123;1000&#125;
            <br />
            /&gt;
          </code>
        </pre>
      </div>
    </main>
  )
}
