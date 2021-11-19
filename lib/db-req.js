export async function saveSystem(system) {
  console.log("saveSystem");
  const response = await fetch('/api/save-system', {
    method: 'POST',
    body: JSON.stringify({ system: system }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

export async function createSystem(systemData) {
  console.log("createSystem");
  const response = await fetch('/api/create-system', {
    method: 'POST',
    body: JSON.stringify({ systemData: systemData }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}